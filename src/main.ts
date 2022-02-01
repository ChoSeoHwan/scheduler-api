import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from '~/app.module';
import { ServerConfig } from '~/initialize/configs/server.config';

const bootstrap = async () => {
    console.log('ci test 2');

    const app = await NestFactory.create(AppModule);

    // 각종 라이브러리에 container 주입
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // server config 조회
    const configService = app.get(ConfigService);
    const { PORT } = configService.get<ServerConfig>('server') || {};

    // service 시작
    await app.listen(PORT || 3000);

    // ready 호출
    process.send?.('ready');
    console.log(`Application is running on: ${await app.getUrl()}`);

    // interrupt
    process.on('SIGINT', async () => {
        await app.close();

        console.log('Application closed.');
        process.exit(0);
    });
};

bootstrap().then();
