## Migration
1. create resource using `npm run resource:create --name=${name}`
2. modify your entity
3. run `npm run migration:gen -- src/common/migration/${name} ` to generate migration name
4. run `npm run migration:up`
5. if you make any changes in entity before step 4, it will generate same migration (will be duplicate query), you can use the latest migrations strongly not

