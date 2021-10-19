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
    int i = Collections.binarySearch(sortedLetters, letterToFind);
    return i >= 0 ? i : -1;
  }

  static List<String> filterListWithStream(List<String> letters, String letterToExclude) {
    return letters
      .stream()
      .filter(letter -> !letter.equals(letterToExclude))
      .collect(Collectors.toList());
  }
}
