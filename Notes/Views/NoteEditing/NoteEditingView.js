import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Button, Image } from 'react-native';
import Note from '../../Models/Note'
import * as ImagePicker from 'expo-image-picker';

const NoteEdit = ({route, navigation}) => {
    const { didCreateNote } = route.params;
    
    const [image, setImage] = useState(route.params.note.image)
    const [title, setTitle] = React.useState(route.params.note.title)
    const [text, setText] = React.useState(route.params.note.text)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    const didTapSaveButton = () => {
        if (!title || /^\s*$/.test(title)) {
            alert("Note should have title");
            return
        }

        didCreateNote(new Note(title, text, image), route.params.note.id)
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput onChangeText={setTitle} value={title} placeholder="Note title" style={[styles.titleInput, styles.input]}/>
            <TextInput onChangeText={setText} value={text} placeholder="Note text" style={[styles.input]}/>
            { image  && (
                <Image source={{uri: image}} style={styles.image} />
            )}
            <View style={styles.button}>
            <Button title="Select image" onPress={pickImage} style={styles.button}/>
            </View>
            <View style={styles.button}>
            <Button title="Save" onPress={didTapSaveButton} style={styles.button}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20
    }, 
    titleInput: {
        marginTop: 20,
        fontSize: 20
    },
    input: {
        marginBottom: 10,
        width: 200
    },
    button: {
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10
    }
})

export default NoteEdit