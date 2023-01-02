import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Realm from '../../src/RealmDB/Realm';

export default function Home() {

    const [contacts, setcontacts] = useState(Realm.objects("Contact"))
    const [bike, setbike] = useState(Realm.objects("Bike"))

    const [Uid, setUid] = useState('')
    const [Name, setname] = useState('')
    const [Number, setnumber] = useState('')

    useEffect(() => {
        Realm.addListener("change", somethingChanged);
        // return (
        //     Realm.removeListener("change", somethingChanged)
        // )
    }, []);


    const addHandler = () => {
        let dog;
        // Open a transaction.
        Realm.write(() => {
            // Assign a newly-created instance to the variable.
            if (Number) {
                dog = Realm.create("Contact", { phoneNumber: Number, Name: Name, uid: Uid, bike: { uid: Uid, Name: 'Dogggy' } }, "modified");
            }
            else {
                dog = Realm.create("Bike", { Name: Name, uid: Uid }, "modified");

            }
        });

        console.log("first", dog)
        setUid(null)
        setname(null)
        setnumber(null)
    }

    const deleteData = (item, inx) => {
        Realm.write(() =>
            Realm.delete(
                Realm.objects(item?.phoneNumber ? 'Contact' : 'Bike')[inx],
            ),
        );
    }

    const somethingChanged = () => {
        setcontacts(Realm.objects("Contact"));
        setbike(Realm.objects("Bike"))
        console.log('something Changed!!');
    }

    const renderItem = (item, index) => {
        return (
            <View style={{ margin: 10 }}>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    {item?.phoneNumber ?
                        index === 0 && (<Text style={{ fontSize: 22, color: '#841584' }}>Contacts</Text>) :
                        index === 0 && (<Text style={{ fontSize: 22, color: '#841584' }}>Bikes</Text>)}
                </View>
                <TouchableOpacity style={{ marginHorizontal: 32 }} onPress={() => deleteData(item, index)}>
                    <Text style={styles.ItemText}>{item?.uid}</Text>
                    <Text style={styles.ItemText}>{item?.Name}</Text>
                    <Text style={styles.ItemText}>{item?.phoneNumber}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{}}>Realm DB</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around', marginTop: 20 }}>
                {/* <TextInput
                    style={styles.textInput}
                /> */}
                <Text style={styles.textTitle}>UID :       </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => {
                        setUid(value)
                    }}
                    value={Uid}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around', marginTop: 20 }}>
                {/* <TextInput
                    style={styles.textInput}
                /> */}
                <Text style={styles.textTitle}>Name :   </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => {
                        setname(value)
                    }}
                    value={Name}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
                {/* <TextInput
                    style={styles.textInput}
                /> */}
                <Text style={styles.textTitle}>Number :</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => {
                        setnumber(value)
                    }}
                    value={Number}
                />
            </View>
            <View style={{ alignItems: 'flex-end', width: '90%' }}>
                <Button
                    onPress={() => addHandler()}
                    title="Add Data"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

            <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'lightgrey', marginTop: 20, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                <FlatList
                    data={contacts}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />
                <FlatList
                    data={bike}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 24
    },
    textInput: {
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        color: 'black',
        fontSize: 18,
        padding: 5
    },
    ItemText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '500'
    }
})