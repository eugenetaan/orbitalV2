import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { sessionStorage } from '../localstorage'
import { logCategoriesToDB } from '../components/dbLogDataFunctions'

const CategoriesScreen = () => {
    [categories, setCategories] = useState(sessionStorage.getItem('Cats'));
    [newCat, setNewCat] = useState("");


    const handleAddPress = (existingCats) => {
        if (newCat.length == 0) {
            alert("Category cannot be blank")
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
                <Text>Add New Category</Text>
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
        marginTop: 100
    },
    viewingArea: {
        
    }

})