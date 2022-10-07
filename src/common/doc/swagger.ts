import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function swagger(app: INestApplication, environment: string) {
    if ( environment !== 'development') {
        return
    }

    const docOpt = new DocumentBuilder()
    .setTitle("My first api with NestJs")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, docOpt);

    SwaggerModule.setup('swagger', app, document)
}