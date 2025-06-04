import { api } from "../../api";

function Index() {
  api.queries.auth.post.login({
    username: 'test-user-lea-1',
    // email: 'tanda+1@ext.lemonde.fr',
    password: 'test-password-lea',
  });

  return (
    <h2>Public Index page</h2>
  )
}

export default Index
