<p align="center">
    <img src="resources/images/intro.gif" width="600" alt="analytics gif">
    <h2 align="center"> Analytics Pipeline </h2>
    <p align="center"><a href="https://www.linkedin.com/in/isahillohiya/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin"></a>

## Architecture Overview
This project implements a real-time log analytics pipeline using AWS services to monitor and analyze user interactions on a static website hosted on S3 via CloudFront. The pipeline includes near real-time analytics using QuickSight, product page usage stats using API Gateway, Lambda, and DynamoDB, as well as integration with Google Analytics using AWS AppFlow.

 <img src="resources/images/architecture.png" width="600" alt="Architacture Diagram">

### Components:

### Components:

1. **S3 & CloudFront**:
   - Serves the static website and captures user interaction logs via CloudFront.

2. **Kinesis Data Streams**:
   - Streams CloudFront logs in near real-time for processing.

3. **Kinesis Data Firehose**:
   - Ingests and transforms data from Kinesis Data Streams.
   - Enriches logs with geographical details and converts them to Parquet format.
   - Partitions data by `event_type/year/month/date`.

4. **S3 Storage**:
   - Stores transformed logs in partitioned folders for efficient querying.
   - Stores data extracted from Google Analytics via AWS AppFlow.

5. **AWS Glue Crawler**:
   - Scans the S3 bucket to detect and update partitions for the Athena tables.
   - Scheduled to run every 24 hours to keep partition information up-to-date.

6. **AWS Glue Jobs**:
   - Runs daily jobs to optimize small files and compact them into larger ones for efficient querying.

7. **Athena & QuickSight**:
   - Athena queries partitioned data in S3, including logs and data from Google Analytics.
   - QuickSight visualizes near real-time analytics.

8. **API Gateway, Lambda, DynamoDB**:
   - Processes and stores immediate usage stats for the product page.

9. **AWS AppFlow**:
   - Integrates with Google Analytics to extract data and store it in S3.
   - Enables analysis of Google Analytics data alongside other website interaction logs.
   
### Dashboard Demo:
<hr>

## Documents Dashboard
 <img src="resources/images/documents_dashboard.png" width="800" alt="document dashboard image">

## QR SCAN Dashboard
 <img src="resources/images/QR_SCAN.png" width="800" alt="document dashboard image">