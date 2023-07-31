import {connect} from 'react-redux';
import Card from '../Card/Card';

export const Favorites = ({myFavorites}) => {
    return (
        <div>
            {myFavorites?.map(charFav => {
                return (
                    <div key={charFav.id}>
                    <Card
                    id={charFav.id}
                    name={charFav.name}
                    status={charFav.status}
                    species={charFav.species}
                    gender={charFav.gender}
                    origin={charFav.origin}
                    image={charFav.image}
                    />
                    </div>
                )
            })}
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps, null)(Favorites)