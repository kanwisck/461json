/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import MapView, { PROVIDER_GOOGLE, Polyline, Polygon, Marker} from 'react-native-maps';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const data = require('./farms.json');
console.log(data);

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };
//
// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//
//   return (
//     // <SafeAreaView style={backgroundStyle}>
//     //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//     //   <ScrollView
//     //     contentInsetAdjustmentBehavior="automatic"
//     //     style={backgroundStyle}>
//     //     <Header />
//     //     <View
//     //       style={{
//     //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//     //       }}>
//     //       <Section title="Step One">
//     //         Edit <Text style={styles.highlight}>App.js</Text> to change this
//     //         screen and then come back to see your edits.
//     //       </Section>
//     //       <Section title="See Your Changes">
//     //         <ReloadInstructions />
//     //       </Section>
//     //       <Section title="Debug">
//     //         <DebugInstructions />
//     //       </Section>
//     //       <Section title="Learn More">
//     //         Read the docs to discover what to do next:
//     //       </Section>
//     //       <LearnMoreLinks />
//     //     </View>
//     //   </ScrollView>
//     // </SafeAreaView>
//     <MapView
//   initialRegion={{
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}
// />
//   );
// };
//
// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
//
// export default App;

export default
class App extends React.Component {
  // const obj = 4;
  //console.log(obj);
  // createObject() {
  //   const data = require('./farms.json');
  //   const obj = JSON.parse(data)
  //   return obj
  // }
  constructor(props){
    super(props);
    this.state = {
      initRegion: {
      latitude: 44.65,
      longitude: -123.03,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421},
      farms: {
        ChambersFarm: [
                {longitude: -123.0253000, latitude: 44.6488167},
                {longitude: -123.0340722, latitude: 44.6525139},
                {longitude: -123.0339972, latitude: 44.6543750},
                {longitude: -123.0221639, latitude: 44.6543417}
        ],
        BruckFarm: [
                {longitude: -122.7278229261364, latitude: 45.30645295190772},
                {longitude: -122.7186602463425, latitude: 45.30178845637814},
                {longitude: -122.7187759437213, latitude: 45.31016089964996},
                {longitude: -122.7277539750468, latitude: 45.30645295190772}
        ],
        DromgooleFarm: [
                {longitude: -123.1718394510763, latitude: 45.3609110216409},
                {longitude: -123.172029749661,  latitude: 45.35610258854292},
                {longitude: -123.1664837704136, latitude: 45.3560302361722},
                {longitude: -123.1626511100443, latitude: 45.3612393850841},
                {longitude: -123.1647286361762, latitude: 45.36137933389124},
                {longitude: -123.1643989695578, latitude: 45.36224477283911},
                {longitude: -123.1680455533266, latitude: 45.36223885899322},
                {longitude: -123.1686193059465, latitude: 45.36090854106052}
        ],
        FreemanFamilyFarm: [
                {longitude: -123.2787515562552, latitude: 45.16480057879585},
                {longitude: -123.2780434181904, latitude: 45.16549568564049},
                {longitude: -123.2779039762229, latitude: 45.16674524535783},
                {longitude: -123.2803253888784, latitude: 45.16676915592996},
                {longitude: -123.2803516583018, latitude: 45.16708414985743},
                {longitude: -123.2779799333409, latitude: 45.16761990033132},
                {longitude: -123.2779597114043, latitude: 45.16858930624299},
                {longitude: -123.2806483673783, latitude: 45.16773322050761},
                {longitude: -123.2818974144741, latitude: 45.1676316021013},
                {longitude: -123.2819530782192, latitude: 45.16682134892718},
                {longitude: -123.2847729338458, latitude: 45.16683289551523},
                {longitude: -123.284716607415,  latitude: 45.16602598458444},
                {longitude: -123.2850171748228, latitude: 45.16599529030023},
                {longitude: -123.2848960877277, latitude: 45.16484272254449}
       ],
       DelanoFarms: [
                {latitude: 45.34976602696314, longitude: -122.4906612610669},
                {latitude: 45.34734844195968, longitude: -122.4890870351521},
                {latitude: 45.34696916300295, longitude: -122.4766555032135},
                {latitude: 45.34935933011464, longitude: -122.476657673228},
                {latitude: 45.34942613104019, longitude: -122.4812338951384},
                {latitude: 45.35601425369122, longitude: -122.4812874822723},
                {latitude: 45.35563182142811, longitude: -122.4860990798462},
                {latitude: 45.35516873474844, longitude: -122.4916948559063},
                {latitude: 45.35600860392447, longitude: -122.4916970105169},
                {latitude: 45.35585137306744, longitude: -122.4971030299542},
                {latitude: 45.35239805183505, longitude: -122.4970552896309},
                {latitude: 45.35254186412757, longitude: -122.4913170858831},
                {latitude: 45.34982994474439, longitude: -122.4908424095733},
                {latitude: 45.34976602696314, longitude: -122.4890687547992}
      ],
      TheBeitelFarm: [
                {latitude: 44.8278554054365, longitude: -122.7628299775307},
                {latitude: 44.81791990689522, longitude: -122.7629399785683},
                {latitude: 44.81793585246291, longitude: -122.7552838343676},
                {latitude: 44.82769631064512, longitude: -122.7555213762199},
                {latitude: 44.8278554054365, longitude: -122.7628299775307}
      ],
      SelectSeedPromisedSeed: [
                {latitude: 45.11056587439315, longitude: -123.2682577145877},
                {latitude: 45.10945898694171, longitude: -123.2641387673533},
                {latitude: 45.11573445731704,  longitude: -123.264226241996},
                {latitude: 45.11557860463325, longitude: -123.2601760513648},
                {latitude: 45.11918282486616, longitude: -123.2601752798507},
                {latitude: 45.11930819825194, longitude: -123.2626676105758},
                {latitude: 45.12120355051001, longitude: -123.2626652528569},
                {latitude: 45.12127423608209, longitude: -123.2636652526741},
                {latitude: 45.12278092264365, longitude: -123.2636051627467},
                {latitude: 45.12258539863196, longitude: -123.2753648239075},
                {latitude: 45.116472841868333, longitude: -123.276054110991},
                {latitude: 45.11668769691688, longitude: -123.2790621746597},
                {latitude: 45.11081214063503, longitude: -123.2794497192028},
                {latitude: 45.11056587439315, longitude: -123.2682577145877}
      ],
      MullenFarms: [
              {latitude: 45.228131241,	longitude:-122.989806315},
	            {latitude: 45.226709879,   longitude:-122.988977489},
	            {latitude: 45.224320981,   longitude:-122.989656814},
	            {latitude: 45.224177944,   longitude:-122.958482691},
	            {latitude: 45.234589515,   longitude:-122.958483520},
	            {latitude: 45.234221153,   longitude:-122.950966000},
	            {latitude: 45.234497377,   longitude:-122.947817846},
	            {latitude: 45.233776731,   longitude:-122.946382270},
	            {latitude: 45.234145666,   longitude:-122.946121143},
	            {latitude: 45.239357189,   longitude:-122.955280216},
	            {latitude: 45.232576909,   longitude:-122.964833367},
	            {latitude: 45.230762545,   longitude:-122.967134104},
	            {latitude: 45.228135403,   longitude:-122.968258606},
	            {latitude: 45.228131241,   longitude:-122.989806315},
      ],
      TidemanJohnsonFarm: [
                {latitude: 45.463380202,   longitude: -122.623511914},
                {latitude: 45.463738072,   longitude: -122.625717949},
                {latitude: 45.462469310,   longitude: -122.625771331},
                {latitude: 45.461276337,   longitude: -122.623816620},
                {latitude: 45.460945347,   longitude: -122.621069013},
                {latitude: 45.463796671,   longitude: -122.619896544},
                {latitude: 45.463380202,   longitude: -122.623511914},
      ],
      VossFarms: [
                {latitude: 45.344336121,    longitude: -122.828323358},
                {latitude: 45.342431421,    longitude: -122.828370325},
                {latitude: 45.342485339,    longitude: -122.831094693},
                {latitude: 45.344236449,    longitude: -122.831227303},
                {latitude: 45.344335977,    longitude: -122.836071276},
                {latitude: 45.336863195,    longitude: -122.836232960},
                {latitude: 45.336301703,    longitude: -122.836186859},
                {latitude: 45.336106641,    longitude: -122.829860454},
                {latitude: 45.338913557,    longitude: -122.826190906},
                {latitude: 45.339207354,    longitude: -122.824456062},
                {latitude: 45.341142117,    longitude: -122.825948004},
                {latitude: 45.344387786,    longitude: -122.825996983},
                {latitude: 45.344336121,    longitude: -122.828323358},
      ],
      HaskinHeritageCenturyFarm: [
                {latitude: 44.50858650097742, longitude: -122.8656571641482}
      ],
      ShadyBrookFarm: [
                {latitude:  45.237954, longitude: -123.102738}
      ],
      BarMRanch: [
                {latitude:  44.472232, longitude: -123.099577}
      ],
      OakCreekFarm: [
                {latitude:  44.478520, longitude: -122.880605}
      ],
      FourRidgeOrchards: [
                {latitude:  45.424348, longitude: -123.007318}
      ],
      HerringFarm: [
                {latitude:  45.311883, longitude: -123.020690}
      ],
      HaslebacherFarms: [
                {latitude:  45.019848, longitude: -122.908823}
      ],
      StupfelFarm: [
                {latitude:  45.198436, longitude: -122.984627}
      ],

      CattrallBrothersVineyards: [
                {latitude:  45.090944, longitude: -123.162414}
      ],
      TheMisnerFamilyFarm: [
                {latitude:  44.634869, longitude: -122.906599}
      ],
      IwasakiBrosInc: [
                {latitude:  45.501292, longitude: -122.966665}
      ],
      PeterFredGossenFarm: [
                {latitude:  45.590375, longitude: -122.908860}
      ],
      MChristensenFamilyFarmLLC: [
                {latitude:  45.133789, longitude: -123.271508}
      ],
      AlderGladeFarm: [
                {latitude:  44.980899, longitude: -122.770134}
      ],
      MosbyCenturyFarm: [
                {latitude:  43.781987, longitude: -122.998386}
      ],
      MapleHillFarm: [
                {latitude:  45.075112, longitude: -122.840758}
      ],
      JesseRubyLooneyFarm: [
                {latitude:  44.753588, longitude: -123.016446}
      ],
      GordonZimmermanFarm: [
                {latitude:  45.324885, longitude: -123.177172}
      ],
      CattrallBrothersVineyards: [
                {latitude:  45.090944, longitude: -123.162414}
      ],
      TheMisnerFamilyFarm: [
                {latitude:  44.634869, longitude: -122.906599}
      ],
      IwasakiBrosInc: [
                {latitude:  45.501292, longitude: -122.966665}
      ],
      PeterFredGossenFarm: [
                {latitude:  45.590375, longitude: -122.908860}
      ],
      MChristensenFamilyFarmLLC: [
                {latitude:  45.133789, longitude: -123.271508}
      ],
      AlderGladeFarm: [
                {latitude:  44.980899, longitude: -122.770134}
      ],
      MosbyCenturyFarm: [
                {latitude:  43.781987, longitude: -122.998386}
      ],
      MapleHillFarm: [
                {latitude:  45.075112, longitude: -122.840758}
            ],
            JesseRubyLooneyFarm: [
                {latitude:  44.753588, longitude: -123.016446}
            ],
            GordonZimmermanFarm: [
                {latitude:  45.324885, longitude: -123.177172}
            ],
            SmithBrosFarmsLLC: [
                {latitude:  44.522904, longitude: -123.207757}
            ],
            GentleacresOrionFarms: [
                {latitude:  44.860827, longitude: -123.237205}
            ],
            MidValleyFarm: [
                {latitude:  45.416350, longitude: -122.900065}
            ],
            ChristensenFarm: [
                {latitude:  44.280888, longitude: -123.070421}
            ],
            TaghonFarm: [
                {latitude:  45.532212, longitude: -123.060562}
            ],
            FisherPatterson: [
                {latitude:  44.895447, longitude: -122.777044}
            ],
            HynesFarm: [
                {latitude:  45.050123, longitude: -122.867596}
            ],
            LouisRAnnaFalkFarm: [
                {latitude:  44.362760, longitude: -123.056456}
            ],
            CharlesLudwigFalkFarm: [
                {latitude:  44.372268, longitude: -123.078142}
            ],
            TheRomigRanch: [
                {latitude:  45.049030, longitude: -123.202956}
            ],
            PlagmannFarmsInc: [
                {latitude:  44.657283, longitude: -122.951597}
            ],
            JansenFarm: [
                {latitude:  45.554103, longitude: -123.084298}
            ],
            ThreeBranchesLLC: [
                {latitude:  45.341602, longitude: -123.226414}
            ],
            BatchelderFarmsLLC: [
                {latitude:  45.589162, longitude: -122.947361}
            ],
            VanDomelenFamilyFarm: [
                {latitude:  45.626693, longitude: -123.038364}
            ],
            ThreeOaksFarm: [
                {latitude:  45.200157, longitude: -123.116015}
            ],
            DuckInnGroupLLC: [
                {latitude:  45.092563, longitude: -122.904082}
            ],
            AJStrubharFarm: [
                {latitude:  45.184137, longitude: -122.765053}
            ],
            SamLuetheFarm: [
                {latitude:  45.605375, longitude: -122.838158}
            ],
            PayneFarms: [
                {latitude:  45.260040, longitude: -123.157239}
            ],
            McPhillipsFarmsInc: [
                {latitude:  45.163932, longitude: -123.237324}
            ],
            HiebenthalFarms: [
                {latitude:  45.002677, longitude: -123.299946}
            ],
            FanningFarms: [
                {latitude:  45.070975, longitude: -123.296363}
            ],
            BierlyFarm: [
                {latitude:  44.323703, longitude: -123.056517}
            ],
            BryonScottFarmsInc: [
                {latitude:  44.522564, longitude: -123.111921}
            ],
            BuzzMitchellFarms: [
                {latitude:  44.568474, longitude: -122.912520}
            ],
            MontgomeryHomesteadFarm: [
                {latitude:  44.732773, longitude: -122.768135}
            ],
            HawleyLandCattleCo: [
                {latitude:  43.754222, longitude: -123.115768}
            ],
            DakotaHeritageRanch: [
                {latitude:  45.316358, longitude: -123.151386}
            ],
            GoodrichFarm: [
                {latitude:  45.185201, longitude: -123.118728}
            ],
            SilverMountainEnterprisesLLC: [
                {latitude:  44.882534, longitude: -122.718024}
            ],
            RichardsonFarm: [
                {latitude:  44.129742, longitude: -123.302477}
            ],
            RiceRanch: [
                {latitude:  44.339541, longitude: -122.770838}
            ],
            JacksonMartinakFarm: [
                {latitude:  44.544599, longitude: -123.046902}
            ],
            McKayFarmsInc: [
                {latitude:  45.196182, longitude: -122.936665}
            ],
            McFarlaneFarm: [
                {latitude:  45.369959, longitude: -122.492875}
            ],
            JackVaughanFarm: [
                {latitude:  45.171955, longitude: -122.553226}
            ]

      }
    }
  }

  render() {
    return (
      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={this.state.initRegion}
      >

      <Polygon // Chambers Farm
              coordinates={this.state.farms.ChambersFarm}
              strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
              fillColor="#ff0000"
              strokeColors={[
                  '#7F0000',
                  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                  '#B24112',
                  '#E5845C',
                  '#238C23',
                  '#7F0000'
              ]}
              strokeWidth={5}
        />

        <Polygon // Bruck Farm
                coordinates={this.state.farms.BruckFarm}
                strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={5}
          />

          <Polygon // Dromgoole Farm
                  coordinates={this.state.farms.DromgooleFarm}
                  strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeColors={[
                      '#7F0000',
                      '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                      '#B24112',
                      '#E5845C',
                      '#238C23',
                      '#7F0000'
                  ]}
                  strokeWidth={5}
            />

            <Polygon // Freeman Family Farm
                    coordinates={this.state.farms.FreemanFamilyFarm}
                    strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={5}
              />

              <Polygon // Delano Farm
                      coordinates={this.state.farms.DelanoFarms}
                      strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                      strokeColors={[
                          '#7F0000',
                          '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                          '#B24112',
                          '#E5845C',
                          '#238C23',
                          '#7F0000'
                      ]}
                      strokeWidth={5}
                />

                <Polygon // The Beitel Farm
                        coordinates={this.state.farms.TheBeitelFarm}
                        strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={5}
                  />

                  <Polygon // Select Seed Promise Seed
                          coordinates={this.state.farms.SelectSeedPromisedSeed}
                          strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                          strokeColors={[
                              '#7F0000',
                              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                              '#B24112',
                              '#E5845C',
                              '#238C23',
                              '#7F0000'
                          ]}
                          strokeWidth={5}
                    />

                    <Polygon // Mullen Farms
                            coordinates={this.state.farms.MullenFarms}
                            strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#7F0000',
                                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                '#B24112',
                                '#E5845C',
                                '#238C23',
                                '#7F0000'
                            ]}
                            strokeWidth={5}
                      />

                      <Polygon // Tideman Johnson Farm
                              coordinates={this.state.farms.TidemanJohnsonFarm}
                              strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                              strokeColors={[
                                  '#7F0000',
                                  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                  '#B24112',
                                  '#E5845C',
                                  '#238C23',
                                  '#7F0000'
                              ]}
                              strokeWidth={5}
                      />

                      <Polygon // Voss Farms
                              coordinates={this.state.farms.VossFarms}
                              strokeColor="#ff0000" // fallback for when `strokeColors` is not supported by the map-provider
                              strokeColors={[
                                  '#7F0000',
                                  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                  '#B24112',
                                  '#E5845C',
                                  '#238C23',
                                  '#7F0000'
                              ]}
                              strokeWidth={5}
                      />

                      <Marker
                            coordinate={this.state.farms.HaskinHeritageCenturyFarm[0]}
                            title={"Haskin Heritage Century Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.ShadyBrookFarm[0]}
                            title={"Shady Brook Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.BarMRanch[0]}
                            title={"Bar M Ranch"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.OakCreekFarm[0]}
                            title={"Oak Creek Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.FourRidgeOrchards[0]}
                            title={"Four Ridge Orchards"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.HerringFarm[0]}
                            title={"Herring Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.HaslebacherFarms[0]}
                            title={"Haslebacher Farms"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.StupfelFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.CattrallBrothersVineyards[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.TheMisnerFamilyFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.IwasakiBrosInc[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.PeterFredGossenFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.MChristensenFamilyFarmLLC[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.AlderGladeFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.MosbyCenturyFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.MapleHillFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.JesseRubyLooneyFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.GordonZimmermanFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.SmithBrosFarmsLLC[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.GentleacresOrionFarms[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.MidValleyFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.ChristensenFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.TaghonFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.FisherPatterson[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.HynesFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.LouisRAnnaFalkFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.CharlesLudwigFalkFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.TheRomigRanch[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.PlagmannFarmsInc[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.JansenFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.ThreeBranchesLLC[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.BatchelderFarmsLLC[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.VanDomelenFamilyFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.ThreeOaksFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.DuckInnGroupLLC[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.AJStrubharFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.SamLuetheFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.PayneFarms[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.McPhillipsFarmsInc[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.HiebenthalFarms[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.FanningFarms[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.BierlyFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.BryonScottFarmsInc[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.BuzzMitchellFarms[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.ChambersFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.MontgomeryHomesteadFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.HawleyLandCattleCo[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.DakotaHeritageRanch[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.GoodrichFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.SilverMountainEnterprisesLLC[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.RichardsonFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.RiceRanch[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.JacksonMartinakFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.McKayFarmsInc[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.McFarlaneFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

                      <Marker
                            coordinate={this.state.farms.JackVaughanFarm[0]}
                            title={"Stupfel Farm"}
                            description={"Select to learn more"}
                      />

      </MapView>
    );
  }
}
