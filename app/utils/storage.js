export default {
  getStoredObject : function(objectName, defaultValue) {
    let storedObject = JSON.parse(localStorage.getItem(objectName));
    return storedObject || defaultValue;
  },
  getStoredString : function(objectName, defaultValue) {
    let storedString = localStorage.getItem(objectName);
    return storedString || defaultValue;
  },
  storeString: function(objectName, foodName){
      localStorage.setItem(objectName, foodName);
  },
  storeObject: function(objectName, object, setState){
      localStorage.setItem(objectName, JSON.stringify(object));
      if(setState){
        setState({[objectName]: object, errorMessage: ''});
      }
  }
};
