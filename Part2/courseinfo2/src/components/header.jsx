const Header = (title) =>{
    const name= title.title
    console.log(name, 'así lo levanta header');
    return(
        <>
        <div>
        <h1>{name}</h1>
        </div>
        
        </>
    )
}
export default Header