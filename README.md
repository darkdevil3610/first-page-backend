# first-page-backend

## Environment variables

Set these in Railway or in your local `.env` file:

```bash
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-long-random-secret
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

When the server starts, it will create the first admin account from `ADMIN_USERNAME` and `ADMIN_PASSWORD` if it does not already exist.

If you need to reset the password for the same admin username, set `ADMIN_FORCE_SEED=true` once and restart the server.