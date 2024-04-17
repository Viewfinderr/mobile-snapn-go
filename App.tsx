/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import {supabase} from './products';
import React, {useState, useEffect} from 'react'; // Importer useState et useEffect de 'react'
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const PAGE_SIZE = 10;

type Item = {
  iditem: string;
  Name: string;
  price: number;
  description: string;
  stock: number;
  img: string;
  reference: string;
  quantity: number;
  uniteMasses: number;
  brand: string;
  nutriscore: string;
  novaScore: string;
  ecoScore: string;
  provenance: string;
}

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function ItemShow() {
  const [items, setItems] = useState<Item[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      let { data: Items, error, count } = await supabase
        .from('Item')
        .select('', {count: 'exact'})
        .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1);

      if (error) {
        console.error('error', error);
      } else {
        setItems(Items);
        const totalPages = Math.ceil(count! / PAGE_SIZE);
        setTotalPages(totalPages);
      }
    };

    fetchItems();
  }, [currentPage]);

  return items; // Retourner les articles chargés
}

function Section({children, title}: SectionProps): React.JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ProductCard({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}): React.JSX.Element {
  return (
    <View style={styles.productCard}>
      <Image source={{uri: image}} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Ajouter au panier</Text>
      </TouchableOpacity>
    </View>
  );
}

function getRandomImageURL(): string {
  const width = 300;
  const height = 200;
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(
    Math.random() * 1000,
  )}`;
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#174F2C',
  };

  // Appel de ItemShow pour charger les données
  const items = ItemShow();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Section title="Produits">
            <View style={styles.productsContainer}>
              {items &&
                items.map((item, index) => (
                  <ProductCard
                    key={index}
                    name={item.Name}
                    price={item.price.toString()}
                    image={item.img}
                  />
                ))}
            </View>
          </Section>
        </View>
      </ScrollView>
      <View style={styles.navBar}>{/* Vos icônes ici */}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#FFB80F',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
