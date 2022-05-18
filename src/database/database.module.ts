import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

const API_KEY = '12365478';
const API_KEY_PROD = 'PROD12345627';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        //conexion a la base de datos en de node hacia postgress docker
        //const { user, host, dbName, password, port } ;
        return {
          type: 'postgres',
          url: configService.postgresUrl,
          // host,
          // port,
          // username: user,
          // password,
          // database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false, //para HEROKU
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },

    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        //conexion a la base de datos en de node hacia postgress docker
        // const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          connectionString: configService.postgresUrl, //para HEROKU
          ssl: {
            rejectUnauthorized: false, //para HEROKU
          },
          // user,
          // host,
          // database: dbName,
          // password,
          // port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
