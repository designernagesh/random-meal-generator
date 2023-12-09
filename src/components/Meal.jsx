const Meal = ({ mealData, showModal, closeModal, readMoreHandler, showMoreInstructions }) => {
    let ingredients = []
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) {
            ingredients.push(`${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`)
        } else {
            // Stop if no more ingredients
            break;
        }
    }

    const { strMealThumb, strMeal, strInstructions, strCategory, strArea, strTags, strYoutube } = mealData;
    function toCapitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {showModal &&
                <div className="overlay showOverlay">
                    <div className="mealModal">
                        <button className="btClose" onClick={closeModal}>X</button>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="video">
                                {strYoutube ? (
                                    <iframe width="100%" height="100%"
                                        src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`}>
                                    </iframe>
                                ) :
                                 (
                                    <strong>No video available</strong>
                                  )}
                            </div>
                            <div className="image">
                                <img src={strMealThumb} alt="Meal Image" />
                            </div>
                        </div>
                        <div className="content">
                            <h4>{strMeal}</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                {strCategory && <p><strong>Category:</strong> {toCapitalize(strCategory)}</p>}
                                {strArea && <p><strong>Area:</strong> {toCapitalize(strArea)}</p>}
                                {strTags && <p><strong>Tags:</strong> {strTags.split(',').join(', ')}</p>}
                            </div>
                            <p><strong>Instructions:</strong>
                                {showMoreInstructions ?
                                    <>
                                        {strInstructions} <span className="readMore" onClick={readMoreHandler}>Read Less</span>
                                    </>
                                    :
                                    <>
                                        {strInstructions.slice(0, 400)} <span className="readMore" onClick={readMoreHandler}>Read More</span>
                                    </>
                                }
                            </p>
                            <p><strong>Ingredients:</strong> {ingredients.map(ingredient => ingredient.trim()).join(", ")}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Meal