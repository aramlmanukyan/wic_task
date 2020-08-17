# WIC task

## Deployment
Deploy via docker-compose

```bash
docker-compose build
docker-compose up
```

#### open localhost:5000


```PAvialable URLs 

localhost:5000/get_data
localhost:5000/get_data/[searchStr]
localhost:5000/users_tasks
localhost:5000/by_post_count

```There is cashig mechanis for /get_data url. It stores data in redis by search query as a key and result as value if key doesn't exist.
   And returns the data from redis if it is avialable there. 
   
```Other solution for tasks 5-8 could be store all data in MongoDB and use the aggregation framework
