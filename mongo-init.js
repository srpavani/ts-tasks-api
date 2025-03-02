db = db.getSiblingDB('task-api');

db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'task-api',
    },
  ],
});

// Create collections
db.createCollection('users');
db.createCollection('tasks');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.tasks.createIndex({ "userId": 1 }); 