import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class App {
  public static void main(String[] args) {
    List<String> letters = createListOfLetters();
    String letterToFind = "c";
    String letterToExclude = "c";

    log("search list with for loop: " + searchListWithForLoop(letters, letterToFind));
    log("search list with int stream: " + searchListWithIntStream(letters, letterToFind));
    log("search list with binary search: " + searchListWithBinarySearch(letters, letterToFind));
    log("filter list with for each loop: " + filterListWithForEachLoop(letters, letterToExclude));
    log("filter list stream: " + filterListWithStream(letters, letterToExclude));
  }

  static void log(Object message) {
    System.out.println(message);
  }

  static List<String> createListOfLetters() {
    List<String> letters = new ArrayList<>();
    letters.add("a");
    letters.add("b");
    letters.add("c");
    return letters;
  }

  static List<Integer> createListOfNumbers() {
    List<Integer> numbers = new ArrayList<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);
    return numbers;
  }

  static int searchListWithForLoop(List<String> letters, String letterToFind) {
    for (int i = 0; i < letters.size(); i++) {
      if (letters.get(i).equals(letterToFind)) {
        return i;
      }
    }
    return -1;
  }

  static int searchListWithIntStream(List<String> letters, String letterToFind) {
    return IntStream.range(0, letters.size())
      .filter(i -> letters.get(i).equals(letterToFind))
      .findFirst()
      .orElse(-1);
  }

  static int searchListWithBinarySearch(List<String> sortedLetters, String letterToFind) {
    return Collections.binarySearch(sortedLetters, letterToFind);
  }

  static List<String> filterListWithForEachLoop(List<String> letters, String letterToExclude) {
    List<String> filtered = new ArrayList<>();
    for (String letter : letters) {
      if (!letter.equals(letterToExclude)) {
        filtered.add(letter);
      }
    }
    return filtered;
  }

  static List<String> filterListWithStream(List<String> letters, String letterToExclude) {
    return letters
      .stream()
      .filter(letter -> !letter.equals(letterToExclude))
      .collect(Collectors.toList());
  }
}
