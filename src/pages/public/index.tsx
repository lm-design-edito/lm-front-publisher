import { api } from "../../api";
import API_ROUTES from "../../api/routes";

function Index() {
  api.query(API_ROUTES.AUTH_LOGIN, {
    method: 'POST',
    body: JSON.stringify({
      username: 'test-user-lea-1',
      // email: 'tanda+1@ext.lemonde.fr',
      password: 'test-password-lea',
    }),
  });

  return (
    <h2>Public Index page</h2>
  )
}

export default Index
