import React from 'react';
import { View, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, Button, Platform } from 'react-native';
import Note from '../../Models/Note';
import NotesListRow from './NoteListRow';
import { useState } from "react/cjs/react.development";

const NotesList = ({navigation}) => {
    const [notes, setNotes] = useState([])

    const onCreateNote = (note, id) => {
        console.log(notes)
        const new_arr = notes.concat(note)
        setNotes(new_arr => [...new_arr, note])
        console.log(notes)
    }

    const updateNote = (note, forId) => {
        const new_list = [...notes];
        new_list.map(old_note => {
            if (old_note.id === forId) {
                old_note.title = note.title
                old_note.text = note.text
                old_note.image = note.image
            }
        })
        setNotes(new_list)
    }

    const deleteNote = (note) => {
        const new_list = [...notes];
        for(let i = 0; i < new_list.length; ++i) {
            if (new_list[i].id === note.id) {
                new_list.splice(i, 1);
                break;
            }
        }
        setNotes(new_list);
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.navigationButton}>
                <Button title="Create" onPress={() => {navigation.navigate('Create', {didCreateNote: onCreateNote, note: new Note("", "", null)})}} />
                </View>
            )
        })
    }, [navigation]);

    const renderItem = (note) => {
        return (
            <TouchableOpacity onPress={ () => {
                    navigation.navigate('Edit', {didCreateNote: updateNote, note: note.item});
                } 
            }>
                <NotesListRow note={note.item} didTapDelete={deleteNote}/>
            </TouchableOpacity>
        )
    };

    const extractKey = (note, index) => { 
        return note.id 
    }

    return (
        <FlatList
            data={notes}
            keyExtractor={extractKey}
            renderItem={renderItem}
            style={styles.list}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        paddingTop: 15,
        paddingLeft: Platform.OS === 'web' ? 40 : 10,
        paddingRight: Platform.OS === 'web' ? 40 : 10
    },
    navigationButton: {
        marginRight: 15
    }
})

export default NotesList