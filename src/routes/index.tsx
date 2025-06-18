import { createFileRoute } from '@tanstack/react-router'
import { useWhoAmI } from "../features/authentification/api/use-who-am-i"
import AvailableServicesList from "../features/services/components/AvailableServicesList";
import './style.css';

const IndexPage = () => {
   const { isAuthenticated } = useWhoAmI();

  return (
    <div className="index-page">
      <div className="index-page__top">
        <h1>Bienvenue sur <span className="accent">LM Publisher</span>.</h1>
        <p>Ici ça publish fort</p>
        <p>Pour toute question, besoin de support 24/7 : <span className="accent">fabas@lemonde.fr</span></p>
      </div>
      {isAuthenticated && 
        <div className="index-page__content">
          <AvailableServicesList className="m-spacer-8" />
        </div>
      }
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
