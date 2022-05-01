console.log("client side javascript file loaded")



const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    messageOne.textContent = 'Loading ....'
    messageTwo.textContent = ''
    if(location && location.length>0){
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent = data.error

        }else{
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Forecast
        }
       
    })
})}
else{
    console.error('Invalid location entered!!')
    messageOne.textContent = ''
}

})