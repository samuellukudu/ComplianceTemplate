# API Specification for Architectural Design Review Tool

This document outlines all the API endpoints that need to be implemented by backend developers for the Architectural Design Review Tool. The frontend currently uses mock data and simulated responses - these need to be replaced with real API calls.

## Base Configuration

\`\`\`
Base URL: /api/v1
Content-Type: application/json
Authentication: Bearer token (JWT)
\`\`\`

## Authentication APIs

### POST /auth/login
**Purpose**: User authentication
\`\`\`json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "engineer"
  }
}
\`\`\`

### POST /auth/logout
**Purpose**: User logout
\`\`\`json
Request: {}
Response: { "message": "Logged out successfully" }
\`\`\`

## File Upload APIs

### POST /files/upload
**Purpose**: Upload CAD files (DXF format)
\`\`\`json
Request: FormData with files
Response:
{
  "files": [
    {
      "id": "file_id",
      "name": "drawing.dxf",
      "size": 1024000,
      "status": "uploaded",
      "discipline": "HVAC",
      "uploadedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

### GET /files/{fileId}/status
**Purpose**: Check file processing status
\`\`\`json
Response:
{
  "id": "file_id",
  "status": "processing|completed|error",
  "progress": 75,
  "analysis": {
    "elements_found": 150,
    "layers_detected": 12,
    "discipline": "HVAC"
  }
}
\`\`\`

### DELETE /files/{fileId}
**Purpose**: Delete uploaded file
\`\`\`json
Response: { "message": "File deleted successfully" }
\`\`\`

## Building Codes APIs

### POST /building-codes/upload
**Purpose**: Upload building code documents
\`\`\`json
Request: FormData with PDF/DOC files
Response:
{
  "documents": [
    {
      "id": "doc_id",
      "name": "IBC_2021.pdf",
      "category": "Building",
      "sections": 45,
      "uploadedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

### GET /building-codes/search
**Purpose**: Search building codes
\`\`\`json
Request: ?query=HVAC+requirements&category=Mechanical&limit=10
Response:
{
  "results": [
    {
      "id": "result_id",
      "title": "HVAC System Requirements",
      "code": "IBC 2021",
      "section": "Section 1203.3",
      "content": "Mechanical ventilation systems shall...",
      "relevance": 95,
      "category": "Mechanical",
      "lastUpdated": "2021-01-01"
    }
  ],
  "total": 25
}
\`\`\`

### GET /building-codes/documents
**Purpose**: List uploaded building code documents
\`\`\`json
Response:
{
  "documents": [
    {
      "id": "doc_id",
      "name": "IBC_2021.pdf",
      "category": "Building",
      "sections": 45,
      "uploadedAt": "2024-01-01T00:00:00Z",
      "status": "indexed"
    }
  ]
}
\`\`\`

## Project Management APIs

### GET /projects
**Purpose**: Get user's projects
\`\`\`json
Response:
{
  "projects": [
    {
      "id": "project_id",
      "name": "Downtown Office Complex",
      "type": "HVAC Review",
      "status": "In Progress",
      "progress": 65,
      "compliance": 12,
      "totalChecks": 15,
      "lastActivity": "2 hours ago",
      "createdAt": "2024-01-01T00:00:00Z",
      "files": ["file1.dxf", "file2.dxf"],
      "discipline": "HVAC"
    }
  ]
}
\`\`\`

### POST /projects
**Purpose**: Create new project
\`\`\`json
Request:
{
  "name": "Downtown Office Complex",
  "type": "Commercial Building",
  "discipline": "HVAC",
  "description": "HVAC system design review"
}

Response:
{
  "id": "project_id",
  "name": "Downtown Office Complex",
  "status": "Created",
  "createdAt": "2024-01-01T00:00:00Z"
}
\`\`\`

### GET /projects/{projectId}
**Purpose**: Get project details
\`\`\`json
Response:
{
  "id": "project_id",
  "name": "Downtown Office Complex",
  "type": "HVAC Review",
  "status": "In Progress",
  "progress": 65,
  "files": [
    {
      "id": "file_id",
      "name": "hvac_plan.dxf",
      "status": "completed",
      "uploadedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "compliance": {
    "passed": 12,
    "failed": 2,
    "pending": 1,
    "total": 15
  }
}
\`\`\`

### PUT /projects/{projectId}
**Purpose**: Update project
\`\`\`json
Request:
{
  "name": "Updated Project Name",
  "status": "Completed",
  "description": "Updated description"
}

Response: { "message": "Project updated successfully" }
\`\`\`

### DELETE /projects/{projectId}
**Purpose**: Delete project
\`\`\`json
Response: { "message": "Project deleted successfully" }
\`\`\`

## AI Chat APIs

### POST /chat/message
**Purpose**: Send message to AI assistant
\`\`\`json
Request:
{
  "projectId": "project_id",
  "message": "Analyze the HVAC system layout",
  "fileIds": ["file1", "file2"],
  "context": "previous_conversation_context"
}

Response:
{
  "id": "message_id",
  "response": "I've analyzed your HVAC system layout...",
  "analysis": {
    "issues_found": 3,
    "recommendations": ["Increase duct size", "Add return air path"],
    "compliance_status": "partial"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

### GET /chat/history/{projectId}
**Purpose**: Get chat history for project
\`\`\`json
Response:
{
  "messages": [
    {
      "id": "msg_id",
      "type": "user|assistant",
      "content": "Message content",
      "timestamp": "2024-01-01T00:00:00Z",
      "files": ["file1.dxf"]
    }
  ]
}
\`\`\`

## Compliance Analysis APIs

### POST /analysis/compliance
**Purpose**: Run compliance analysis on files
\`\`\`json
Request:
{
  "projectId": "project_id",
  "fileIds": ["file1", "file2"],
  "codeReferences": ["IBC_2021", "NEC_2020"]
}

Response:
{
  "analysisId": "analysis_id",
  "status": "processing",
  "estimatedTime": "5 minutes"
}
\`\`\`

### GET /analysis/{analysisId}/results
**Purpose**: Get compliance analysis results
\`\`\`json
Response:
{
  "id": "analysis_id",
  "status": "completed",
  "results": {
    "overall_compliance": 85,
    "issues": [
      {
        "id": "issue_id",
        "severity": "high|medium|low",
        "category": "HVAC",
        "description": "Duct sizing does not meet minimum requirements",
        "code_reference": "IBC 2021 Section 1203.3",
        "location": "Drawing layer: HVAC-DUCTS",
        "recommendation": "Increase duct diameter to 12 inches"
      }
    ],
    "passed_checks": 12,
    "failed_checks": 3,
    "total_checks": 15
  }
}
\`\`\`

## Export APIs

### POST /export/report
**Purpose**: Generate compliance report
\`\`\`json
Request:
{
  "projectId": "project_id",
  "format": "pdf|docx",
  "template": "standard|detailed|summary",
  "includeDrawings": true
}

Response:
{
  "reportId": "report_id",
  "status": "generating",
  "estimatedTime": "2 minutes"
}
\`\`\`

### GET /export/{reportId}/download
**Purpose**: Download generated report
\`\`\`json
Response: Binary file download
\`\`\`

### GET /export/history
**Purpose**: Get export history
\`\`\`json
Response:
{
  "exports": [
    {
      "id": "export_id",
      "projectName": "Downtown Office Complex",
      "format": "pdf",
      "createdAt": "2024-01-01T00:00:00Z",
      "status": "completed",
      "downloadUrl": "/api/v1/export/export_id/download"
    }
  ]
}
\`\`\`

## Team Collaboration APIs

### GET /projects/{projectId}/team
**Purpose**: Get project team members
\`\`\`json
Response:
{
  "members": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "lead_engineer",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

### POST /projects/{projectId}/team/invite
**Purpose**: Invite team member
\`\`\`json
Request:
{
  "email": "newmember@example.com",
  "role": "engineer|reviewer|viewer"
}

Response: { "message": "Invitation sent successfully" }
\`\`\`

### GET /projects/{projectId}/activity
**Purpose**: Get project activity feed
\`\`\`json
Response:
{
  "activities": [
    {
      "id": "activity_id",
      "type": "file_upload|analysis_complete|comment_added",
      "user": "John Doe",
      "description": "Uploaded HVAC_Plan.dxf",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages:

\`\`\`json
400 Bad Request:
{
  "error": "validation_error",
  "message": "Invalid file format. Only DXF files are supported.",
  "details": {
    "field": "file",
    "code": "INVALID_FORMAT"
  }
}

401 Unauthorized:
{
  "error": "unauthorized",
  "message": "Authentication token is required"
}

403 Forbidden:
{
  "error": "forbidden",
  "message": "Insufficient permissions to access this resource"
}

404 Not Found:
{
  "error": "not_found",
  "message": "Project not found"
}

500 Internal Server Error:
{
  "error": "internal_error",
  "message": "An unexpected error occurred"
}
\`\`\`

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- File upload endpoints: 10 requests per minute
- Search endpoints: 100 requests per minute
- Other endpoints: 60 requests per minute

## File Size Limits

- CAD files (DXF): 100MB per file
- Building code documents: 50MB per file
- Maximum 10 files per upload request

## Real-time Features (WebSocket)

### Connection: `/ws/project/{projectId}`

**Events to implement:**
- `file_upload_progress`: Real-time upload progress
- `analysis_update`: Analysis progress updates
- `team_activity`: Real-time team collaboration updates
- `chat_message`: Real-time chat messages

## Implementation Notes

1. **File Processing**: Implement asynchronous file processing with job queues
2. **AI Integration**: Connect to AI/ML services for CAD analysis and chat responses
3. **Database**: Use relational database for structured data, file storage for documents
4. **Caching**: Implement Redis caching for search results and frequently accessed data
5. **Security**: Implement proper authentication, authorization, and file validation
6. **Monitoring**: Add logging and monitoring for all API endpoints
7. **Documentation**: Use OpenAPI/Swagger for interactive API documentation

## Frontend Integration Points

The following frontend components need to be updated to use these APIs:

- `components/chat/chat-interface.tsx` → `/chat/message`, `/chat/history`
- `components/upload/file-upload-area.tsx` → `/files/upload`, `/files/{id}/status`
- `components/building-codes/building-codes-search.tsx` → `/building-codes/search`
- `components/building-codes/building-codes-upload.tsx` → `/building-codes/upload`
- `components/project/project-chat-interface.tsx` → `/projects`, `/chat/message`
- `components/dashboard/project-overview.tsx` → `/projects`
- `lib/project-storage.ts` → Replace localStorage with API calls

This specification provides a complete roadmap for backend developers to implement all necessary APIs for the architectural design review tool.
