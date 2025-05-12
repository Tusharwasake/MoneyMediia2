# MoneyMediia2


# Money Media API Documentation

## Base URL
```
https://moneymediia1.netlify.app/
```

## Authentication
Most endpoints require authentication using a JWT token.

1. **How to authenticate:**
   - Obtain a token via the login endpoint
   - Include the token in request headers:
   ```
   Authorization: Bearer <your_token>
   ```
2. **Permissions:**
   - Some endpoints are public and require no authentication
   - Admin endpoints require authentication with an admin role

## Error Handling
All endpoints return appropriate HTTP status codes:

- `200/201` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (authenticated but not authorized)
- `404` - Not Found
- `500` - Server Error

Error responses follow this format:
```json
{
  "status": "error",
  "message": "Error message details"
}
```

---

## Endpoints

### Authentication

#### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "securepassword",
    "role": "user" // optional, defaults to "user"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "User created",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```
- **Error Responses**:
  - `400` - User already exists
  - `500` - Server error

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "role": "user"
    }
  }
  ```
- **Error Responses**:
  - `401` - Invalid credentials
  - `500` - Server error

---

### Clients

#### Get All Clients
- **URL**: `/clients`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  [
    {
      "_id": "client_id",
      "name": "Client Name",
      "logo": "logo_url"
    }
  ]
  ```
- **Error Response**: `500` - Server error

#### Create Client
- **URL**: `/clients`
- **Method**: `POST`
- **Auth Required**: Yes (Admin)
- **Request Body**:
  ```json
  {
    "name": "Client Name",
    "logo": "logo_url"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "_id": "client_id",
    "name": "Client Name",
    "logo": "logo_url"
  }
  ```
- **Error Responses**:
  - `400` - Name and logo are required
  - `401` - Unauthorized
  - `403` - Not an admin
  - `500` - Server error

#### Update Client
- **URL**: `/clients/:id`
- **Method**: `PUT` or `PATCH`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[client_id]`
- **Request Body**:
  ```json
  {
    "name": "Updated Client Name",
    "logo": "updated_logo_url"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "client_id",
    "name": "Updated Client Name",
    "logo": "updated_logo_url"
  }
  ```
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - Client not found
  - `500` - Server error

#### Delete Client
- **URL**: `/clients/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[client_id]`
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Client deleted successfully"
  }
  ```
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - Client not found
  - `500` - Server error

---

### Services

#### Get All Services
- **URL**: `/services`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  [
    {
      "id": "service_id",
      "title": "Service Title",
      "description": "Service Description",
      "icon": "service_icon",
      "fullDescription": "Detailed description",
      "benefits": ["Benefit 1", "Benefit 2"],
      "processSteps": ["Step 1", "Step 2"],
      "imageSrc": "image_url"
    }
  ]
  ```
- **Error Response**: `500` - Server error

#### Get Service by ID
- **URL**: `/services/:id`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `id=[service_id]`
- **Success Response**: `200 OK`
  ```json
  {
    "id": "service_id",
    "title": "Service Title",
    "description": "Service Description",
    "icon": "service_icon",
    "fullDescription": "Detailed description",
    "benefits": ["Benefit 1", "Benefit 2"],
    "processSteps": ["Step 1", "Step 2"],
    "imageSrc": "image_url"
  }
  ```
- **Error Responses**:
  - `404` - Service not found
  - `500` - Server error

#### Create Service
- **URL**: `/services`
- **Method**: `POST`
- **Auth Required**: Yes (Admin)
- **Request Body**:
  ```json
  {
    "id": "service_id",
    "title": "Service Title",
    "description": "Service Description",
    "icon": "service_icon",
    "fullDescription": "Detailed description",
    "benefits": ["Benefit 1", "Benefit 2"],
    "processSteps": ["Step 1", "Step 2"],
    "imageSrc": "image_url"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "id": "service_id",
    "title": "Service Title",
    "description": "Service Description",
    "icon": "service_icon",
    "fullDescription": "Detailed description",
    "benefits": ["Benefit 1", "Benefit 2"],
    "processSteps": ["Step 1", "Step 2"],
    "imageSrc": "image_url"
  }
  ```
- **Error Responses**:
  - `400` - Service ID already exists
  - `401` - Unauthorized
  - `403` - Not an admin
  - `500` - Server error

#### Update Service
- **URL**: `/services/:id`
- **Method**: `PUT` or `PATCH`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[service_id]`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "id": "service_id",
    "title": "Updated Title",
    "description": "Updated Description",
    "icon": "service_icon",
    "fullDescription": "Detailed description",
    "benefits": ["Benefit 1", "Benefit 2"],
    "processSteps": ["Step 1", "Step 2"],
    "imageSrc": "image_url"
  }
  ```
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - Service not found
  - `500` - Server error

#### Delete Service
- **URL**: `/services/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[service_id]`
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Service deleted"
  }
  ```
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - Service not found
  - `500` - Server error

---

### Testimonials

#### Get All Testimonials
- **URL**: `/testimonials`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "testimonials": [
        {
          "_id": "testimonial_id",
          "content": "Testimonial content",
          "clientName": "Client Name",
          "clientPosition": "CEO",
          "clientCompany": "Company Name",
          "rating": 5,
          "imageUrl": "image_url",
          "isActive": true,
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
  }
  ```
- **Error Responses**:
  - `400` - Validation error
  - `401` - Unauthorized
  - `403` - Not an admin
  - `500` - Server error

#### Update Portfolio Item
- **URL**: `/portfolio/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[portfolio_id]`
- **Request Body**: Any fields that need to be updated
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "featured": true
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "portfolioItem": {
        "_id": "portfolio_id",
        "type": "video",
        "title": "Updated Title",
        "category": "Category",
        "client": "Client Name",
        "thumbnail": "thumbnail_url",
        "industry": "Industry",
        "description": "Updated Description",
        "featured": true,
        "tags": ["tag1", "tag2"],
        "videoUrl": "video_url",
        "duration": "10:30",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
  }
  ```
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - No portfolio item found with that ID
  - `500` - Server error

#### Delete Portfolio Item
- **URL**: `/portfolio/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[portfolio_id]`
- **Success Response**: `204 No Content`
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - No portfolio item found with that ID
  - `500` - Server error

---

### Newsletter

#### Subscribe to Newsletter
- **URL**: `/newsletter`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "Subscribed successfully"
  }
  ```
- **Error Responses**:
  - `400` - Email is required
  - `409` - Email already subscribed
  - `500` - Subscription failed

---

### Contact

#### Submit Contact Form
- **URL**: `/contactus`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "Full Name",
    "email": "user@example.com",
    "companyName": "Company Name",
    "serviceOfInterest": "End-to-End Video Production",
    "message": "Detailed message explaining requirements"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully!"
  }
  ```
- **Error Responses**:
  - `400` - Please fill all required fields
  - `500` - Something went wrong. Please try again later.

---

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",
  "role": "String (user|admin)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Client
```json
{
  "_id": "ObjectId",
  "name": "String",
  "logo": "String (URL)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Service
```json
{
  "_id": "ObjectId",
  "id": "String",
  "title": "String",
  "description": "String",
  "icon": "String",
  "fullDescription": "String",
  "benefits": ["String"],
  "processSteps": ["String"],
  "imageSrc": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Testimonial
```json
{
  "_id": "ObjectId",
  "content": "String",
  "clientName": "String",
  "clientPosition": "String",
  "clientCompany": "String",
  "rating": "Number (1-5)",
  "imageUrl": "String (URL)",
  "isActive": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Portfolio Item
```json
{
  "_id": "ObjectId",
  "type": "String (video|blog|case-study|image)",
  "title": "String",
  "category": "String",
  "client": "String",
  "thumbnail": "String (URL)",
  "industry": "String",
  "description": "String",
  "featured": "Boolean",
  "tags": ["String"],
  
  // Video-specific fields
  "videoUrl": "String (URL)",
  "duration": "String (MM:SS)",
  
  // Blog-specific fields
  "author": "String",
  "readTime": "Number (minutes)",
  "publishDate": "Date",
  "content": "String",
  "blogUrl": "String (URL)",
  "excerpt": "String",
  
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Newsletter
```json
{
  "_id": "ObjectId",
  "email": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Contact
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "companyName": "String",
  "serviceOfInterest": "String (from predefined list)",
  "message": "String",
  "createdAt": "Date"
}
```

## Available Service Types
The following service types are available for the `serviceOfInterest` field in the Contact form:

- Script & Blog Writing
- Infographics for Social & Ads
- End-to-End Video Production
- Language Translations & Dubbing
- Professional Shooting
- Creative Brand Shoots
- Audio Podcasts
- Corporate Videos
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Featured Testimonials
- **URL**: `/testimonials/featured`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: `limit=[number]` (optional, default: 3)
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "testimonials": [
        {
          "_id": "testimonial_id",
          "content": "Testimonial content",
          "clientName": "Client Name",
          "clientPosition": "CEO",
          "clientCompany": "Company Name",
          "rating": 5,
          "imageUrl": "image_url",
          "isActive": true,
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Testimonial by ID
- **URL**: `/testimonials/:id`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `id=[testimonial_id]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "testimonial": {
        "_id": "testimonial_id",
        "content": "Testimonial content",
        "clientName": "Client Name",
        "clientPosition": "CEO",
        "clientCompany": "Company Name",
        "rating": 5,
        "imageUrl": "image_url",
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z":00.000Z"
      }
    }
  }
  ```
- **Error Responses**:
  - `404` - Testimonial not found
  - `500` - Server error

#### Create Testimonial
- **URL**: `/testimonials`
- **Method**: `POST`
- **Auth Required**: Yes (Admin)
- **Request Body**:
  ```json
  {
    "content": "Testimonial content",
    "clientName": "Client Name",
    "clientPosition": "CEO",
    "clientCompany": "Company Name",
    "rating": 5,
    "imageUrl": "image_url"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "status": "success",
    "data": {
      "testimonial": {
        "_id": "testimonial_id",
        "content": "Testimonial content",
        "clientName": "Client Name",
        "clientPosition": "CEO",
        "clientCompany": "Company Name",
        "rating": 5,
        "imageUrl": "image_url",
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
  }
  ```
- **Error Responses**:
  - `400` - Validation error
  - `401` - Unauthorized
  - `403` - Not an admin
  - `500` - Server error

#### Update Testimonial
- **URL**: `/testimonials/:id`
- **Method**: `PUT` or `PATCH`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[testimonial_id]`
- **Request Body**:
  ```json
  {
    "content": "Updated content",
    "rating": 4
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "testimonial": {
        "_id": "testimonial_id",
        "content": "Updated content",
        "clientName": "Client Name",
        "clientPosition": "CEO",
        "clientCompany": "Company Name",
        "rating": 4,
        "imageUrl": "image_url",
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
  }
  ```
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - Testimonial not found
  - `500` - Server error

#### Delete Testimonial
- **URL**: `/testimonials/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin)
- **URL Parameters**: `id=[testimonial_id]`
- **Success Response**: `204 No Content`
- **Error Responses**:
  - `401` - Unauthorized
  - `403` - Not an admin
  - `404` - Testimonial not found
  - `500` - Server error

---

### Portfolio Items

#### Get All Portfolio Items
- **URL**: `/portfolio`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 3,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": false,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Featured Portfolio Items
- **URL**: `/portfolio/featured`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: `limit=[number]` (optional, default: 6)
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": true,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Latest Portfolio Items
- **URL**: `/portfolio/latest`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: `limit=[number]` (optional, default: 6)
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": true,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Portfolio Items by Type
- **URL**: `/portfolio/type/:type`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `type=[video|blog|case-study|image]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": true,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Responses**:
  - `400` - Invalid portfolio item type
  - `500` - Server error

#### Get Portfolio Items by Category
- **URL**: `/portfolio/category/:category`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `category=[category_name]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category Name",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": true,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Portfolio Items by Industry
- **URL**: `/portfolio/industry/:industry`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `industry=[industry_name]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry Name",
          "description": "Description",
          "featured": true,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Portfolio Stats
- **URL**: `/portfolio/stats`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "stats": {
        "total": 20,
        "byType": {
          "video": 10,
          "blog": 5,
          "caseStudy": 3,
          "image": 2
        },
        "byCategory": {
          "Marketing": 8,
          "Design": 5,
          "Content": 7
        },
        "byIndustry": {
          "Finance": 5,
          "Healthcare": 8,
          "Technology": 7
        }
      }
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Search Portfolio Items
- **URL**: `/portfolio/search`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: `query=[search_term]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "portfolioItems": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Portfolio Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description containing search term",
          "featured": true,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Responses**:
  - `400` - Search query is required
  - `500` - Server error

#### Get Blog Posts
- **URL**: `/portfolio/blogs`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: `limit=[number]` (optional, default: 10)
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "blogPosts": [
        {
          "_id": "portfolio_id",
          "type": "blog",
          "title": "Blog Title",
          "category": "Category",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": false,
          "tags": ["tag1", "tag2"],
          "author": "Author Name",
          "readTime": 5,
          "publishDate": "2023-01-01T00:00:00.000Z",
          "content": "Blog content",
          "blogUrl": "blog_url",
          "excerpt": "Blog excerpt",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Related Blog Posts
- **URL**: `/portfolio/blog/:id/related`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `id=[blog_id]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "relatedPosts": [
        {
          "_id": "portfolio_id",
          "type": "blog",
          "title": "Related Blog Title",
          "category": "Category",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": false,
          "tags": ["tag1", "tag2"],
          "author": "Author Name",
          "readTime": 5,
          "publishDate": "2023-01-01T00:00:00.000Z",
          "content": "Blog content",
          "blogUrl": "blog_url",
          "excerpt": "Blog excerpt",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Responses**:
  - `404` - No blog post found with that ID
  - `500` - Server error

#### Get Videos
- **URL**: `/portfolio/videos`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: `limit=[number]` (optional, default: 10)
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "videos": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Video Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": false,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "10:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Videos by Duration
- **URL**: `/portfolio/videos/duration`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**: 
  - `minDuration=[time_format]` (optional)
  - `maxDuration=[time_format]` (optional)
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "videos": [
        {
          "_id": "portfolio_id",
          "type": "video",
          "title": "Video Title",
          "category": "Category",
          "client": "Client Name",
          "thumbnail": "thumbnail_url",
          "industry": "Industry",
          "description": "Description",
          "featured": false,
          "tags": ["tag1", "tag2"],
          "videoUrl": "video_url",
          "duration": "05:30",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```
- **Error Response**: `500` - Server error

#### Get Portfolio Item by ID
- **URL**: `/portfolio/:id`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `id=[portfolio_id]`
- **Success Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "portfolioItem": {
        "_id": "portfolio_id",
        "type": "video",
        "title": "Portfolio Title",
        "category": "Category",
        "client": "Client Name",
        "thumbnail": "thumbnail_url",
        "industry": "Industry",
        "description": "Description",
        "featured": true,
        "tags": ["tag1", "tag2"],
        "videoUrl": "video_url",
        "duration": "10:30",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
  }
  ```
- **Error Responses**:
  - `404` - No portfolio item found with that ID
  - `500` - Server error

#### Create Portfolio Item
- **URL**: `/portfolio`
- **Method**: `POST`
- **Auth Required**: Yes (Admin)
- **Request Body**:
  ```json
  {
    "type": "video",
    "title": "Portfolio Title",
    "category": "Category",
    "client": "Client Name",
    "thumbnail": "thumbnail_url",
    "videoUrl": "video_url",
    "industry": "Industry",
    "duration": "10:30",
    "description": "Description",
    "featured": true,
    "tags": ["tag1", "tag2"]
  }
  ```
  or for blog type:
  ```json
  {
    "type": "blog",
    "title": "Blog Title",
    "category": "Category",
    "thumbnail": "thumbnail_url",
    "industry": "Industry",
    "author": "Author Name",
    "readTime": 5,
    "publishDate": "2023-01-01T00:00:00.000Z",
    "content": "Blog content",
    "blogUrl": "blog_url",
    "excerpt": "Blog excerpt",
    "description": "Description",
    "featured": false,
    "tags": ["tag1", "tag2"]
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "status": "success",
    "data": {
      "portfolioItem": {
        "_id": "portfolio_id",
        "type": "video",
        "title": "Portfolio Title",
        "category": "Category",
        "client": "Client Name",
        "thumbnail": "thumbnail_url",
        "industry": "Industry",
        "description": "Description",
        "featured": true,
        "tags": ["tag1", "tag2"],
        "videoUrl": "video_url",
        "duration": "10:30",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00
