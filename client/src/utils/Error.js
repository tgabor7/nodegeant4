/*
This class handles error messages
*/
class Error {

    static dialog = null;
    //initialize the message handling class with the error message dialog
    static init(dialog){
        Error.dialog = dialog;
    }
    //shows and error message
    static showError(title, message){
        Error.dialog.setTitle(title);
        Error.dialog.setContent(message);
        Error.dialog.showDialog()
    }

}

export default Error;