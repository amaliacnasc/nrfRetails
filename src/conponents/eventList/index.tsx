import { Event } from "@/types/event";
import { View, Text, StyleSheet } from 'react-native'
import EventCard from "../eventCard";
const events: Event[] = [
  {
    title: "Tech Summit 2024",
    date: "15/01/24",
    time: "10:00 AM",
    location: "Av. Paulista, 1000 - São Paulo, SP",
    about: "Um evento para explorar as inovações mais recentes em tecnologia e startups.",
    speakers: [
      { name: "João Pereira", photoUrl: "https://example.com/photos/joao.jpg" },
      { name: "Ana Souza", photoUrl: "https://example.com/photos/ana.jpg" },
    ],
  },
  {
    title: "Workshop de UX Design",
    date: "22/02/24",
    time: "02:00 PM",
    location: "Rua das Flores, 200 - Curitiba, PR",
    about: "Aprenda os fundamentos de UX design com profissionais da área.",
    speakers: [
      { name: "Maria Silva", photoUrl: "https://example.com/photos/maria.jpg" },
      { name: "Pedro Santos", photoUrl: "https://example.com/photos/pedro.jpg" },
    ],
  },
  {
    title: "Seminário de Sustentabilidade",
    date: "05/03/24",
    time: "09:00 AM",
    location: "Centro de Convenções, Salvador, BA",
    about: "Discuta o impacto das mudanças climáticas e soluções sustentáveis.",
    speakers: [
      { name: "Carla Mendes" },
      { name: "Roberto Almeida", photoUrl: "https://example.com/photos/roberto.jpg" },
    ],
  },
  {
    title: "Hackathon Inovação",
    date: "12/04/24",
    time: "08:00 AM",
    location: "Espaço Tech, Florianópolis, SC",
    about: "Participe de 48 horas de desenvolvimento e criação de soluções inovadoras.",
    speakers: [
      { name: "Fernanda Torres" },
      { name: "Lucas Ramos", photoUrl: "https://example.com/photos/lucas.jpg" },
    ],
  },
  {
    title: "Fórum de Educação",
    date: "18/05/24",
    time: "03:00 PM",
    location: "Teatro Municipal, Porto Alegre, RS",
    about: "Explore novos métodos e abordagens para melhorar a educação.",
    speakers: [
      { name: "Eduardo Lima", photoUrl: "https://example.com/photos/eduardo.jpg" },
      { name: "Letícia Costa" },
    ],
  },
];


export default function EventList() {
  return (
    <View className="w-full" style={styles.container} >
      <Text>
        Sua programação
      </Text>
      <View style={styles.list}>
        {events.map((event, index) => {
          return (
            <EventCard key={index} event={event} />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 30,
    gap: 20,

  },
  list: {
    gap: 10
  }
});