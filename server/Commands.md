sequelize init

sequelize model:generate --name Contact --attributes firstName:string,lastName:string,phone:string,email:string

sequelize model:generate --name Contact

sequelize db:create

sequelize db:migrate

sequelize db:migrate:all

sequelize seed:generate --name seed-contact
sequelize db:seed:all
sequelize db:seed