import React from 'react'
import {View, StyleSheet, Image, Dimensions} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

const Theme = (props) => {

    const changeTheme = () => {
        props.theme.theme ? props.setTheme(false) : props.setTheme(true);
        console.log(props.theme.theme)
    }
 
    return (
        <View style={styles.imgWrap}>
            <TouchableHighlight onPress={changeTheme}>
                <Image style={{width: 50, height: 50}} source={props.theme.theme ? require('./wb_sunny_black.png') : require('./wb_sunny_white.png')} />
            </TouchableHighlight>
        </View>
    )
}

let styles = StyleSheet.create({
    imgWrap: {
        height: 60,
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        padding: 5,
        left: Dimensions.get('window').width - 55,
        borderRadius: 30
    }
})

export default Theme