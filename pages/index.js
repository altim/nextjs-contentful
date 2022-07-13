import {createClient} from 'contentful'
import {RecipeCard} from "../components/RecipeCard";

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENFUL_SPACE_ID,
        accessToken: process.env.CONTENTUL_ACCESS_KEY
    })

    const res = await client.getEntries({content_type: 'recipe'})
    return {
        props: {
            recipes: res.items,
        },
        revalidate: 1
    }
}

export default function Recipes({recipes}) {
    console.log(recipes)
    return (
        <div className="recipe-list">
            {recipes.map(recipe => <RecipeCard recipe={recipe}/>)}

            <style jsx>{`
              .recipe-list {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px 60px;
              }
            `}</style>
        </div>
    )
}