import React from 'react';
import { View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TourismInfoCard: React.FC = () => {
  const tourismInfoData = [
    {
      title: "Programação Cultural",
      items: [
        "10 de janeiro: Reunião de integração no Millennium Hotel Broadway Times Square",
        "Visitas técnicas a lojas na 5th Avenue",
        "11 de janeiro: City tour cultural",
      ],
      icon: "building",
    },
    {
      title: "Programação NRF",
      items: [
        "12 de janeiro: NRF das 8h às 17h, incluindo visita guiada das 12h às 14h",
        "13 de janeiro: NRF das 8h às 17h",
        "14 de janeiro: NRF das 8h às 17h",
      ],
      icon: "calendar",
    },
    {
      title: "Visitas Especiais",
      items: [
        "15 de janeiro: Visita ao Consulado-Geral do Brasil em New York às 11h",
        "Visita à Câmara de Comércio de New York às 15h",
        "16 de janeiro: Visitas técnicas pela manhã",
      ],
      icon: "map-marker",
    },
    {
      title: "Dicas Úteis",
      items: [
        "Leve roupas confortáveis e adequadas ao inverno em Nova York",
        "Tenha sempre uma garrafa de água e lanches leves",
        "Mantenha os documentos necessários sempre à mão",
        "Planeje o transporte com antecedência para evitar atrasos",
      ],
      icon: "lightbulb-o",
    },
  ];

  return (
    <View className="p-4 mb-14 bg-white">
      <Text className="text-xl font-bold text-blue-500 mb-6">Informações de Turismo</Text>
      {tourismInfoData.map((info, index) => (
        <View
          key={index}
          className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md"
        >
          <View className="flex-row items-start mb-4">
            <Icon name={info.icon} size={28} color="#3b82f6" className="mr-4" />
            <Text className="text-lg font-semibold text-blue-500 flex-shrink">{info.title}</Text>
          </View>

          {/* Lista de itens */}
          {info.items.map((item, itemIndex) => (
            <View key={itemIndex} className="flex flex-row items-start mb-2">
              <Icon name="check-circle" size={16} color="#3b82f6" className="mr-2" />
              <Text className="text-gray-700 flex-1">{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default TourismInfoCard;