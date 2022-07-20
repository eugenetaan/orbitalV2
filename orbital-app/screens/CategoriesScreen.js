import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { sessionStorage } from '../localstorage'
import { logCategoriesToDB } from '../components/dbLogDataFunctions'

const CategoriesScreen = () => {
    [categories, setCategories] = useState(sessionStorage.getItem('Cats'));
    [newCat, setNewCat] = useState("");
    [deleteCat, setDeleteCat] = useState("");


    // to work on matching even with or without whitespace
    const checkIfCatExists = (catToAdd, existingCats) => {
        var i;
        for (i = 0; i < existingCats.length; i++) {
            //console.log(existingCats[i].value)
            if (existingCats[i].value.toLowerCase() == catToAdd.toLowerCase() ) {
                return true;
            }
        }
        return false;
    }

    const removeCat = (deleteCat, existingCats) => {
        if (existingCats.length == 1) {
            alert("Must have at least one category")
        }
        else {
            return existingCats.filter(function(ele){
                return ele.value.toLowerCase() !== deleteCat.toLowerCase();
            });
        }
    }

    const handleAddPress = (existingCats) => {
        if (newCat.length == 0) {
            alert("Category cannot be blank")
        } else if (checkIfCatExists(newCat, existingCats)) {
            alert("Category Already Exists")
        } else {
            var updatedCats = [{ 'value' : newCat}, ...existingCats];
            setCategories(updatedCats)
            sessionStorage.setItem('Cats', updatedCats);
            setNewCat("");
            console.log(sessionStorage.getItem('Cats'));
            logCategoriesToDB();
            alert('Category Successfully Added');
        }
    }

    const handleDeleteCat = (existingCats) => {
        if (deleteCat.length == 0) {
            alert("Please Enter A Category");
        } else if (!checkIfCatExists(deleteCat, existingCats)) {
            alert("Category Not Found");
        } else {
            var updatedCats = removeCat(deleteCat, existingCats);
            setCategories(updatedCats)
            sessionStorage.setItem('Cats', updatedCats);
            setDeleteCat('');
            logCategoriesToDB();
            alert('Category Successfully Deleted');
        }
    }

    return (
    <View>
        <View styles={styles.viewingArea}>
            <Text style={{fontSize:20, textAlign:"center"}}>Current Categories</Text>
            <FlatList style={styles.categoriesList} data={categories} 
                renderItem={({item}) => (
                    <View style={styles.categoryItem}>
                        <Text  style={{fontSize:20}}>{item.value}</Text>
                    </View>
                )}
            ></FlatList>
        </View>
        <View style={styles.inputArea}>
            <Text style={{fontSize:20, textAlign:"center"}}>Add Your Custom Category!</Text>
            <TextInput 
                placeholder='Insert New Cat Here'
                value = {newCat}
                onChangeText = {text => setNewCat(text)}
                style={styles.newCatInput} 
            />
            <TouchableOpacity style={styles.confirmInputCatButton} onPress={() => handleAddPress(categories)}>
                <Text style={{fontSize:16}}>Add Category</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputArea}>
            <Text style={{fontSize:20, textAlign:"center"}}>Remove Category</Text>
            <TextInput 
                placeholder='Enter Category To Delete'
                value = {deleteCat}
                onChangeText = {text => setDeleteCat(text)}
                style={styles.newCatInput} 
            />
            <TouchableOpacity style={styles.confirmDeleteCatButton} onPress={() => handleDeleteCat(categories)}>
                <Text style={{fontSize:16}}>Delete Category</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default CategoriesScreen;

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
        width: "90%",
        marginLeft: '5%',
        borderRadius:10,
    },
    newCatInput: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,        
    },
    confirmInputCatButton: {
        backgroundColor: "#5F7DDE",
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12,
        alignSelf: 'center',
        marginTop: 20 
    },
    inputArea: {
        marginTop: 50
    },
    viewingArea: {
        height: 50,
    },
    confirmDeleteCatButton: {
        backgroundColor: "darkred",
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12,
        alignSelf: 'center',
        marginTop: 20 
    },

})