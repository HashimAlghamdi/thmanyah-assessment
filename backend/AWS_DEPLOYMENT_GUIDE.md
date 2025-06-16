# AWS Deployment Guide for Thmanyah Backend

This guide provides multiple options for deploying your Fastify backend to AWS.

## Prerequisites

1. **AWS Account**: Ensure you have an AWS account
2. **AWS CLI**: Install and configure AWS CLI
3. **Docker**: Install Docker Desktop
4. **Database**: Set up a PostgreSQL database (AWS RDS recommended)

## Database Setup (Required First)

### Option A: AWS RDS PostgreSQL

1. Go to AWS RDS Console
2. Create a new PostgreSQL database
3. Choose the appropriate instance size (db.t3.micro for testing)
4. Note down the connection details:
   - Host (endpoint)
   - Port (5432)
   - Database name
   - Username
   - Password

### Option B: AWS RDS Aurora Serverless (Cost-effective)

1. Go to AWS RDS Console
2. Create Aurora Serverless v2 PostgreSQL
3. Note connection details

## Deployment Option 1: AWS App Runner (Recommended)

AWS App Runner is the easiest way to deploy containerized applications.

### Steps:

1. **Push code to GitHub** (if not already done)

2. **Create App Runner Service:**
   ```bash
   # Go to AWS Console > App Runner
   # Click "Create an App Runner service"
   # Choose "Source code repository" > GitHub
   # Connect your repository
   # Choose your backend folder if it's in a monorepo
   ```

3. **Configuration:**
   - **Build settings**: Use the provided `apprunner.yaml`
   - **Service settings**: 
     - Service name: `thmanyah-backend`
     - Port: `3001`
   - **Environment variables**:
     ```
     DATABASE_URL=postgresql://username:password@host:5432/database
     NODE_ENV=production
     PORT=3001
     ```

4. **Deploy**: Click "Create & Deploy"

### Cost: ~$7-25/month depending on usage

## Deployment Option 2: AWS ECS with Fargate

More control over infrastructure, suitable for production workloads.

### Steps:

1. **Build and Push Docker Image:**
   ```bash
   # Build the image
   cd backend
   docker build -t thmanyah-backend .
   
   # Create ECR repository
   aws ecr create-repository --repository-name thmanyah-backend
   
   # Get login token
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   
   # Tag and push
   docker tag thmanyah-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/thmanyah-backend:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/thmanyah-backend:latest
   ```

2. **Create ECS Cluster:**
   ```bash
   aws ecs create-cluster --cluster-name thmanyah-cluster
   ```

3. **Create Task Definition:**
   ```json
   {
     "family": "thmanyah-backend",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
     "containerDefinitions": [
       {
         "name": "thmanyah-backend",
         "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/thmanyah-backend:latest",
         "portMappings": [
           {
             "containerPort": 3001,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "DATABASE_URL",
             "value": "postgresql://username:password@host:5432/database"
           },
           {
             "name": "NODE_ENV",
             "value": "production"
           }
         ],
         "logConfiguration": {
           "logDriver": "awslogs",
           "options": {
             "awslogs-group": "/ecs/thmanyah-backend",
             "awslogs-region": "us-east-1",
             "awslogs-stream-prefix": "ecs"
           }
         }
       }
     ]
   }
   ```

4. **Create ECS Service with ALB**

### Cost: ~$15-50/month

## Deployment Option 3: AWS Lambda (Serverless)

Requires modifying your application for serverless deployment.

### Required Changes:

1. **Install AWS Lambda adapter:**
   ```bash
   npm install @fastify/aws-lambda
   ```

2. **Create Lambda handler:**
   ```typescript
   // src/lambda.ts
   import { buildServer } from './server';
   import awsLambdaFastify from '@fastify/aws-lambda';

   const server = buildServer();
   export const handler = awsLambdaFastify(server);
   ```

3. **Update build script in package.json:**
   ```json
   {
     "scripts": {
       "build:lambda": "tsc && cp -r prisma dist/ && cd dist && zip -r ../lambda.zip ."
     }
   }
   ```

### Deploy with AWS SAM or Serverless Framework

### Cost: Pay-per-request (very cost-effective for low traffic)

## Environment Variables Setup

For any deployment option, you'll need these environment variables:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:5432/database

# Application
NODE_ENV=production
PORT=3001

# Optional: If you need CORS for your frontend
FRONTEND_URL=https://your-frontend-domain.com
```

## Database Migration

After deployment, run Prisma migrations:

```bash
# For App Runner or ECS, you can run this locally:
DATABASE_URL="your-production-database-url" npx prisma db push

# Or add it as a post-deployment step in your CI/CD pipeline
```

## Domain Setup (Optional)

1. **Route 53**: Register or transfer your domain
2. **Certificate Manager**: Request SSL certificate
3. **CloudFront**: Set up CDN with custom domain
4. **ALB**: Configure Application Load Balancer

## Monitoring and Logging

- **CloudWatch**: Monitor application metrics and logs
- **X-Ray**: Distributed tracing (for App Runner/ECS)
- **Health Checks**: Configure health check endpoints

## Security Best Practices

1. **VPC**: Deploy in private subnets
2. **Security Groups**: Restrict access to necessary ports
3. **IAM Roles**: Use least privilege principle
4. **Secrets Manager**: Store database credentials securely
5. **WAF**: Web Application Firewall for protection

## Next Steps

1. Choose your deployment option (App Runner recommended for beginners)
2. Set up your PostgreSQL database
3. Configure environment variables
4. Deploy your application
5. Test your API endpoints
6. Set up monitoring and alerts

## Troubleshooting

### Common Issues:

1. **Database Connection**: Ensure your RDS security group allows connections
2. **Environment Variables**: Double-check DATABASE_URL format
3. **Docker Build**: Make sure all dependencies are installed
4. **Port Configuration**: Ensure your service listens on the correct port

### Support:
- AWS Documentation
- AWS Support (if you have a support plan)
- Stack Overflow for technical issues

## Cost Optimization

1. **Right-sizing**: Start with smaller instances and scale up
2. **Reserved Instances**: For predictable workloads
3. **Spot Instances**: For fault-tolerant workloads
4. **Auto Scaling**: Scale based on demand
5. **CloudWatch**: Monitor and optimize based on metrics 