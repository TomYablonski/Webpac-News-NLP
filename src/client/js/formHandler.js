import axios from 'axios';
const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value
     // check what text was put into the form field
        if(regex .test(formText)){
            console.log('Looks like an URL');
            Client.checkForName(formText) 
            console.log("::: Form Submitted :::")
            axios.post('http://localhost:3001/article', {articleUrl: formText})
            .then(function(res) {
                console.log(res);
                const data = res.data;
				document.getElementById('resultSection').style.display = "block";
                document.getElementById('polarity').innerHTML = data.polarity;
                document.getElementById('polarity_confidence').innerHTML = data.polarity_confidence.toFixed(2);
                document.getElementById('subjectivity').innerHTML = data.subjectivity;
                document.getElementById('subjectivity_confidence').innerHTML = data.subjectivity_confidence;
                document.getElementById('text').innerHTML = data.text;
            })
        } else {
            console.log('Not a URL');
            document.getElementById('text').innerHTML = "Not a valid url. Please enter a valid url. ";
        }; 
};



export { handleSubmit }






