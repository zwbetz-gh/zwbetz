import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

public class App {
  public static void main(String[] args) {
    List<String> letters = List.of("a", "b", "c");
    String letterToFind = "c";

    log("search list for loop: " + new SearchListForLoop().searchList(letters, letterToFind));
    log("search list int stream: " + new SearchListIntStream().searchList(letters, letterToFind));
    log("search list binary: " + new SearchListIntBinary().searchList(letters, letterToFind));
  }

  static void log(Object message) {
    System.out.println(message);
  }
}

class SearchListForLoop {
  int searchList(List<String> letters, String letterToFind) {
    for (int i = 0; i < letters.size(); i++) {
      if (letters.get(i).equals(letterToFind)) {
        return i;
      }
    }
    return -1;
  }
}

class SearchListIntStream {
  int searchList(List<String> letters, String letterToFind) {
    return IntStream.range(0, letters.size())
      .filter(i -> letters.get(i).equals(letterToFind))
      .findFirst()
      .orElse(-1);
  }
}

class SearchListIntBinary {
  int searchList(List<String> sortedLetters, String letterToFind) {
    int i = Collections.binarySearch(sortedLetters, letterToFind);
    return i >= 0 ? i : -1;
  }
}
