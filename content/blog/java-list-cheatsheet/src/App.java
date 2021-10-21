import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class App {

  public static void main(String[] args) {
    linearSearch();
    binarySearch();
    sort();
    filter();
    transform();
    unique();
    frequency();
    sum();
    max();
    min();
    any();
    all();
  }

  static void log(Object message) {
    System.out.println(message);
  }

  static List<String> createLetters() {
    List<String> letters = new ArrayList<>();
    letters.add("a");
    letters.add("b");
    letters.add("c");
    letters.add("c");
    return letters;
  }

  static List<Integer> createNumbers() {
    List<Integer> numbers = new ArrayList<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);
    return numbers;
  }

  static void linearSearch() {
    List<String> letters = createLetters();

    int index = IntStream.range(0, letters.size())
      .filter(i -> letters.get(i).equals("c"))
      .findFirst()
      .orElse(-1);

    log(String.format("The first index of c in %s is %s", letters, index));
  }

  static void binarySearch() {
    List<String> letters = createLetters();

    // Reminder that binarySearch requires a sorted list.
    // For this sample, letters is already sorted.
    // Collections.sort(letters);

    int index = Collections.binarySearch(letters, "c");

    log(String.format("The first index of c in %s is %s", letters, index));
  }

  static void sort() {
    List<String> letters = createLetters();

    List<String> reversed = letters
      .stream()
      .sorted(Comparator.reverseOrder())
      .collect(Collectors.toList());

    log(String.format("When %s is reversed it becomes %s", letters, reversed));
  }

  static void filter() {
    List<Integer> numbers = createNumbers();

    List<Integer> evenNumbers = numbers
      .stream()
      .filter(letter -> letter % 2 == 0)
      .collect(Collectors.toList());

    log(String.format("The even numbers in %s are %s", numbers, evenNumbers));
  }

  static void transform() {
    List<String> letters = createLetters();

    List<String> uppercasedLetters = letters
      .stream()
      .map(String::toUpperCase)
      .collect(Collectors.toList());

    log(String.format("When %s is uppercased it becomes %s", letters, uppercasedLetters));
  }

  static void unique() {
    List<String> letters = createLetters();

    Set<String> uniqueLetters = letters
      .stream()
      .collect(Collectors.toSet());

    log(String.format("These are duplicated %s but these are unique %s", letters, uniqueLetters));
  }

  static void frequency() {
    List<String> letters = createLetters();

    int frequency = Collections.frequency(letters, "c");

    log(String.format("%s appears %s times in %s", "c", frequency, letters));
  }

  static void sum() {
    List<Integer> numbers = createNumbers();

    int sum = numbers
      .stream()
      .reduce(0, Integer::sum);

    log(String.format("The sum of %s is %s", numbers, sum));
  }

  static void max() {
    List<Integer> numbers = createNumbers();

    int max = numbers
      .stream()
      .mapToInt(Integer::valueOf)
      .max()
      .orElseThrow();

    log(String.format("The max of %s is %s", numbers, max));
  }

  static void min() {
    List<Integer> numbers = createNumbers();

    int min = numbers
      .stream()
      .mapToInt(Integer::valueOf)
      .min()
      .orElseThrow();

    log(String.format("The min of %s is %s", numbers, min));
  }

  static void any() {
    List<Integer> numbers = createNumbers();

    boolean result = numbers
      .stream()
      .anyMatch(number -> number % 2 == 0);

    log(String.format("Some numbers in %s are even? %s", numbers, result));
  }

  static void all() {
    List<Integer> numbers = createNumbers();

    boolean result = numbers
      .stream()
      .allMatch(number -> number % 2 == 0);

    log(String.format("All numbers in %s are even? %s", numbers, result));
  }

}
