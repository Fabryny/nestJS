
import { BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { EventSubscriber, EntitySubscriberInterface, Equal,InsertEvent, Not, UpdateEvent, FindOperator } from 'typeorm'
import { CryptUtil } from 'src/common/utils/crypt.util';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo(){
        return User;
    }
    
    async beforeInsert(event: InsertEvent<User>) {
        await this._checkEmailUniqueness(event);
        await this._hashInsertedPassword(event);
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        await this._checkEmailUniqueness(event);
        await this._hashUpdatedPassword(event); 
    }

    async _hashPassword(user: User) {
        user.salt = await CryptUtil.generateSalt();
        user.password = await CryptUtil.hashPassword(user.password, user.salt);
    }

    async _hashInsertedPassword(event: InsertEvent<User>) {
        const user = event.entity;
        await this._hashPassword(user);
        return;
    }

    async _hashUpdatedPassword(event: UpdateEvent<User>) {
        // user being updated
        const user = event.entity as User;
    
        // get existing record
        const currentRecord = await event.manager.findOne(User, {
          where: {
            id: user.id,
          },
        });
    
        // has it changed?
        if (
          currentRecord?.password &&
          user?.password &&
          user.password !== currentRecord.password
        ) {
          // yes, hash the password
          await this._hashPassword(user);
        }
    
        // all done
        return;
      }

    async _checkEmailUniqueness(event: InsertEvent<User> | UpdateEvent<User>) {
        const user = event.entity;

        if(user?.email) {
            const criteria: {
                where: {
                    id?: FindOperator<string>;
                    email?: FindOperator<string>;
                };
            } = {
                where: {
                    email: Equal(user.email),
                },
            };
            if(user.id) {
                criteria.where.id = Not(user.id);
            }   

            const count = await event.manager.count(User, criteria);

            if (count > 0) {
                throw new BadRequestException('Email address already exists.');
            } else {
                return
            }
        } else {
            return
        }
    }
}