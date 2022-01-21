import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from '~/app.module';
import { ServerConfig } from '~/initialize/configs/server.config';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);

    // 각종 라이브러리에 container 주입
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // server config 조회
    const configService = app.get(ConfigService);
    const { PORT } = configService.get<ServerConfig>('server') || {};

    // service 시작
    await app.listen(PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
};

bootstrap().then();
