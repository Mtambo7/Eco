import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {


    return (


        <View style={styles.container}>


            <Text>hi there </Text>
            <Text>Hello word</Text>
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
