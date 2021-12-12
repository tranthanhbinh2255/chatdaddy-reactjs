ChatDaddy Frontend Test
=======================

# A. Test Requirement
https://www.notion.so/Frontend-Test-for-new-developers-f1a517fbeddf4dca8e155bc8555058c3

1. The following things must be functional:
- [ ] infinite scroll for contacts (no need to sort alphabetically, can just use the order they come in)
- [ ] select contacts
- [ ] filter by search (remember to debounce!), include tag, exclude tag, message sent, message received

2. This mini-project is meant to test your abilities to build a complex component as well as your ability to interact with REST APIs. You will be judged on the following:
- [ ] Libraries used (besides react, react is compulsory to use)
- [ ] Quality of UI — animations, transitions, how polished it is
- [ ] Quality of code — cleanliness maintained, how modular it is

3. The docs for the service to perform CRUD operations on contacts: [https://chatdaddy.stoplight.io/docs/openapi/b3A6MTUxMDc5OTY-get-contacts](https://chatdaddy.stoplight.io/docs/openapi/b3A6MTUxMDc5OTY-get-contacts). For example, you fetch contacts via a GET method on  [https://api-im.chatdaddy.tech/contacts](https://api-im.chatdaddy.tech/contacts). The docs also mention all the models used & how to paginate via cursor based pagination.

4. The audience service mentioned above requires a bearer access token. You can generate access tokens from the refresh token via the authentication service. Docs for access token generation: [https://chatdaddy.stoplight.io/docs/openapi/repos/chatdaddy-service-auth/openapi.yaml/paths/~1token/post](https://chatdaddy.stoplight.io/docs/openapi/repos/chatdaddy-service-auth/openapi.yaml/paths/~1token/post). The authentication services follows a simple refresh token/access token model. You can use the following request body to generate access tokens:

```jsx
{
  "refreshToken": "**059c420e-7424-431f-b23b-af0ecabfe7b8**",
  "teamId": "**a001994b-918b-4939-8518-3377732e4e88**"
}

```

# B. How to run

```sh
# Intall dependencies
yarn

# Start dev server
yarn start
```
