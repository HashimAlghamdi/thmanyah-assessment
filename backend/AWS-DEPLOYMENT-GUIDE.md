# Free AWS Deployment Guide

This guide will help you deploy your Node.js/TypeScript backend to AWS completely free for small projects.

## 🎯 Free AWS Services We'll Use

1. **AWS Lambda** - 1M free requests per month
2. **API Gateway** - 1M free API calls per month  
3. **RDS PostgreSQL** - 750 hours free per month (t3.micro)
4. **CloudWatch** - Basic monitoring included

## 📋 Prerequisites

1. **AWS Account** (free tier eligible)
2. **AWS CLI** installed and configured
3. **Node.js** (18.x or later)
4. **Serverless Framework**

## Step-by-Step Deployment

### Step 1: Setup AWS Account & CLI

1. Create AWS account at https://aws.amazon.com/
2. Install AWS CLI:
   ```bash
   curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
   sudo installer -pkg AWSCLIV2.pkg -target /
   ```
3. Configure AWS CLI:
   ```bash
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Default region: us-east-1
   # Default output format: json
   ```

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

### Step 3: Setup Free PostgreSQL Database

#### Option A: AWS RDS Free Tier (Recommended)
1. Go to AWS RDS Console
2. Create Database:
   - Engine: PostgreSQL
   - Version: 15.x
   - Templates: Free tier
   - DB instance class: db.t3.micro
   - Storage: 20 GB (free tier limit)
   - Username: postgres
   - Password: [choose strong password]
   - VPC: Default
   - Public access: Yes (for initial setup)
   - Security group: Create new (allow port 5432)

#### Option B: Free External PostgreSQL (Alternative)
- **Neon** (free): https://neon.tech/ - 3GB free
- **Supabase** (free): https://supabase.com/ - 500MB free
- **ElephantSQL** (free): https://www.elephantsql.com/ - 20MB free

### Step 4: Configure Environment Variables

1. Create `.env` file:
   ```bash
   DATABASE_URL="postgresql://username:password@your-db-host:5432/your-db-name"
   ```

2. For AWS Lambda, set environment variables in `serverless.yml` (already configured)

### Step 5: Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

### Step 6: Build and Deploy

```bash
# Install Serverless Framework globally
npm install -g serverless

# Build the project
npm run build

# Deploy to AWS
npm run deploy
```

### Step 7: Update Database Security (Important!)

After deployment, update your RDS security group to only allow connections from your Lambda function:
1. Go to RDS Console → Your database → Security groups
2. Edit inbound rules
3. Remove the 0.0.0.0/0 rule
4. Add your Lambda function's security group

## Your API is Live!

After deployment, you'll get an endpoint like:
```
https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev
```

## Free Tier Limits

- **Lambda**: 1M requests/month + 400,000 GB-seconds compute
- **API Gateway**: 1M REST API calls/month  
- **RDS**: 750 hours/month of t3.micro + 20GB storage
- **Data Transfer**: 1GB/month out to internet

## Cost Optimization Tips

1. **Use Lambda wisely** - It only runs when needed
2. **Monitor usage** - Set up billing alerts
3. **Database connections** - Use connection pooling
4. **Clean up unused resources** - Delete when done

## Important Notes

- RDS will be your main cost after free tier
- Consider using serverless databases for truly free solutions
- Monitor your AWS billing dashboard regularly
- Set up billing alerts for $1, $5, $10

## Alternative Free Options

If you want completely free (no database costs):

### Option 1: Railway (Free Tier)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Option 2: Render (Free Tier)
- Connect your GitHub repo
- Choose "Web Service"
- Build: `npm run build`
- Start: `npm start`

### Option 3: Fly.io (Free Tier)
```bash
flyctl auth signup
flyctl launch
flyctl deploy
```

## Troubleshooting

### Common Issues:
1. **Lambda timeout** - Increase timeout in serverless.yml
2. **Database connection** - Check security groups
3. **Build errors** - Ensure TypeScript compiles correctly
4. **CORS issues** - Check API Gateway CORS settings

## Support

If you encounter issues:
1. Check AWS CloudWatch logs
2. Use `sls logs -f api` for Lambda logs
3. Test locally with `sls offline`

Your backend is now deployed on AWS for free! 