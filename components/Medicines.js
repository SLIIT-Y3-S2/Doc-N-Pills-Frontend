import React from 'react'
import { ScrollView,View } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { Card, Button, Title, Paragraph, IconButton, StyleSheet  } from 'react-native-paper';


const Medicines = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
    <ScrollView>
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />

        <Card style={{backgroundColor:'#87cefa',margin:10,borderRadius:5,display:'flex'}}>
            <Card.Content>
                <Title style={{fontWeight:'bold'}}>Brand Name</Title>
                <Paragraph>Medical Term</Paragraph>
                <Paragraph>Rs. 175.00 | 250 mg | Type</Paragraph>
                <Paragraph style={{fontWeight:'bold'}}>Available Stock :- 100</Paragraph>
            </Card.Content>
            <Card.Actions>
                <IconButton 
                    icon="archive-edit"
                    iconColor={'#1e90ff'}
                    size={20} 
                />
                <IconButton
                    icon="delete"
                    iconColor={'#1e90ff'}
                    size={20} 
                />
            </Card.Actions>
        </Card>

    </ScrollView>
    
    <View style={{marginLeft:'75%', marginBottom:'5%'}}>
            <IconButton 
                icon="plus"
                iconColor={'white'}
                size={40} 
                backgroundColor={'#1e90ff'}
                borderRadius={10}
            />
    </View>
    </>
    
  )
}


export default Medicines