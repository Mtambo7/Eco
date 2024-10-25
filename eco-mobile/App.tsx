import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
    const user: string = "Mtambo"

    return (


        <View style={styles.container}>


            <Text>hi there </Text>
            <Text>{user} </Text>
            <Text>Hello my girl</Text>

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
