module.exports = ()=>{
    
    let logged_in = false;

    let process_id = null;

    let login = (name, password)=>{
        fetch('http://localhost:9000/userAPI/login', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: name, password: password })
          })
            .then(response => response.text())
            .then(response => {
              if(response === "Successfull login!") logged_in = true;
            });
    }
}