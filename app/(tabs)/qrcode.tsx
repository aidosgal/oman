import {View, Text, StyleSheet, StatusBar, Image, ScrollView} from 'react-native';

export default function QrCodeScreen() {
    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={{fontWeight: 500, fontSize: 26, textAlign: "center", marginTop: 100}}>Scan to transfer</Text>
            <View style={{marginHorizontal: "auto", padding: 20, borderRadius: 20, backgroundColor: "white", marginTop: 20, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Image source={require('../../assets/images/qrcode.png')}
                       style={{}}
                />
            </View>
            <View style={{marginTop: 40}}>

                {/* Step 1 */}
                <View style={{flexDirection: "row"}}>
                    {/* Number + Line container */}
                    <View style={{alignItems: "center"}}>
                        {/* Number circle */}
                        <View style={styles.circle}>
                            <Text>1</Text>
                        </View>
                        {/* Vertical line */}
                        <View style={styles.line}/>
                    </View>

                    {/* Text */}
                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Point the camera at the QR code.</Text>
                        <Text style={styles.subtitle}>Make sure the code is fully visible in the frame.</Text>
                    </View>
                </View>

                {/* Step 2 */}
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.circle}>
                            <Text>2</Text>
                        </View>
                        <View style={styles.line}/>
                    </View>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Check the recipient's information.</Text>
                        <Text style={styles.subtitle}>Before confirming, make sure the name and account number are correct.</Text>
                    </View>
                </View>

                {/* Step 3 */}
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.circle}>
                            <Text>3</Text>
                        </View>
                        <View style={styles.line}/>
                    </View>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Enter the transfer amount.</Text>
                        <Text style={styles.subtitle}>Before confirming, make sure the name and account number are correct.</Text>
                    </View>
                </View>

                {/* Step 4 — last (no line below) */}
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.circle}>
                            <Text>4</Text>
                        </View>
                    </View>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Confirm the transfer.</Text>
                        <Text style={styles.subtitle}>Click "Send" or "Pay."</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3F4F5",
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 40
    },
    circle: {
        width: 27,
        height: 27,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#EAEBF0",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },

    line: {
        width: 2,
        height: 40,
        backgroundColor: "#EAEBF0",
        marginTop: 2,
    },

    title: {
        color: "#252525",
        fontSize: 15,
        fontWeight: "400",
    },

    subtitle: {
        color: "#838BA7",
        fontSize: 15,
        fontWeight: "400",
    },
})