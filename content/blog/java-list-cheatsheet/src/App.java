import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
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
    count();
    sum();
    max();
    min();
    any();
    all();
  }

  static void log(String format, Object... args) {
    System.out.println(String.format(format, args));
  }

  static List<String> createLetters() {
    return Arrays.asList("a", "b", "c", "c");
  }

  static List<Integer> createNumbers() {
    return Arrays.asList(1, 2, 3);
  }

  static void linearSearch() {
    List<String> letters = createLetters();

    int index = IntStream.range(0, letters.size())
      .filter(i -> letters.get(i).equals("c"))
      .findFirst()
      .orElse(-1);

    log("The first index of c in %s is %s", letters, index);
  }

  static void binarySearch() {
    List<String> letters = createLetters();

    // Reminder that binarySearch requires a sorted list.
    // For this sample, letters is already sorted.
    // Collections.sort(letters);

    int index = Collections.binarySearch(letters, "c");

    log("The first index of c in %s is %s", letters, index);
  }

  static void sort() {
    List<String> letters = createLetters();

    List<String> reversed = letters
      .stream()
      .sorted(Comparator.reverseOrder())
      .collect(Collectors.toList());

    log("When %s is reversed it becomes %s", letters, reversed);
  }

  static void filter() {
    List<Integer> numbers = createNumbers();

    List<Integer> evenNumbers = numbers
      .stream()
      .filter(number -> number % 2 == 0)
      .collect(Collectors.toList());

    log("The even numbers in %s are %s", numbers, evenNumbers);
  }

  static void transform() {
    List<String> letters = createLetters();

    List<String> uppercasedLetters = letters
      .stream()
      .map(String::toUpperCase)
      .collect(Collectors.toList());

    log("When %s is uppercased it becomes %s", letters, uppercasedLetters);
  }

  static void unique() {
    List<String> letters = createLetters();

    List<String> uniqueLetters = letters
      .stream()
      .distinct()
      .collect(Collectors.toList());

    log("These are duplicated %s but these are unique %s", letters, uniqueLetters);
  }

  static void count() {
    List<String> letters = createLetters();

    long count = letters
      .stream()
      .filter(letter -> letter.equals("c"))
      .count();

    log("%s appears %s times in %s", "c", count, letters);
  }

  static void sum() {
    List<Integer> numbers = createNumbers();

    int sum = numbers
      .stream()
      .reduce(0, Integer::sum);

    log("The sum of %s is %s", numbers, sum);
  }

  static void max() {
    List<Integer> numbers = createNumbers();

    int max = numbers
      .stream()
      .mapToInt(Integer::valueOf)
      .max()
      .orElseThrow();

    log("The max of %s is %s", numbers, max);
  }

  static void min() {
    List<Integer> numbers = createNumbers();

    int min = numbers
      .stream()
      .mapToInt(Integer::valueOf)
      .min()
      .orElseThrow();

    log("The min of %s is %s", numbers, min);
  }

  static void any() {
    List<Integer> numbers = createNumbers();

    boolean result = numbers
      .stream()
      .anyMatch(number -> number % 2 == 0);

    log("Some numbers in %s are even? %s", numbers, result);
  }

  static void all() {
    List<Integer> numbers = createNumbers();

    boolean result = numbers
      .stream()
      .allMatch(number -> number % 2 == 0);

    log("All numbers in %s are even? %s", numbers, result);
  }

}
