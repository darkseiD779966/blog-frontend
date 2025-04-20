describe('CreatePostComponent', () => {
    beforeEach(() => {
      // Simulate an authenticated user session
      localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODAxNDYxMzNiOTJjNDhkODU0MzgyZWUiLCJlbWFpbCI6InNvZmFmYXNhMEBnbWFpbC5jb20iLCJpYXQiOjE3NDUxNjIyODAsImV4cCI6MTc0NTI0ODY4MH0.jqceqF3l3Fak96ek-B8c8W7423hW5CE6lEXCA5-rbZA'); // Set the test token
      cy.visit('/posts/create');
    });
  
    it('should load the create post form', () => {
      cy.get('input[name="title"]').should('be.visible');
      cy.get('textarea[name="body"]').should('be.visible');
      cy.get('input[name="coverImageUrl"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('should submit the form and create a post', () => {
      // Intercept the POST request and inject the Authorization header
      cy.intercept('POST', '**/posts', (req) => {
        req.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`; // Add token
      }).as('createPost');
  
      cy.get('input[name="title"]').type('Test Post Title');
      cy.get('textarea[name="body"]').type('This is the content of the test post.');
      cy.get('input[name="coverImageUrl"]').type('https://example.com/image.jpg');
      cy.get('form').submit();
  
      // Wait for the post creation request to complete
      cy.wait('@createPost');
  
      // Check the URL for the redirect
      cy.url({ timeout: 10000 }).should('include', '/posts/me');
    });
  
    it('should show an error message on failure', () => {
      // Simulate an error response from the API
      cy.intercept('POST', '**/posts', {
        statusCode: 500,
        body: { message: 'Error creating post' },
      }).as('createPostError');
  
      cy.get('input[name="title"]').type('Test Post Title');
      cy.get('textarea[name="body"]').type('This is the content of the test post.');
      cy.get('input[name="coverImageUrl"]').type('https://example.com/image.jpg');
      cy.get('form').submit();
  
      cy.wait('@createPostError');
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Error creating post.');
      });
    });
  });
  