import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, Button, Image } from 'react-native';
import { colors, Colors } from '../../styles/Colors'


class NoteListRow extends React.Component {
    constructor(props) {
        super(props)
        this.note = props.note
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.row}>
                    <View style={styles.container}>
                        { this.note.image && (
                            <Image source={{uri: this.note.image}} style={styles.image} />
                        )}   
                        <View>
                            <Text style={styles.title}>{this.note.title}</Text>
                            <Text>{this.note.text}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <Button title="Delete" onPress={() => this.props.didTapDelete(this.note)} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        marginBottom: 15,
        backgroundColor: colors.rowBackground,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        minHeight: 50,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'

    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttonView: {
        marginLeft: 10
    },
    title: {
        fontSize: 25,
        marginRight: 20
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    }
})

export default NoteListRow