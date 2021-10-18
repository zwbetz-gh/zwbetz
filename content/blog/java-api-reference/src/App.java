import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class App {
  public static void main(String[] args) {
    List<String> letters = new ArrayList<>();
    letters.add("a");
    letters.add("b");
    letters.add("c");

    String letterToFind = "c";
    log("search list for loop: " + new SearchListForLoop().searchList(letters, letterToFind));
    log("search list int stream: " + new SearchListIntStream().searchList(letters, letterToFind));
    log("search list binary: " + new SearchListIntBinary().searchList(letters, letterToFind));
    
    String letterToExclude = "c";
    log("filter list iterator: " + new FilterListIterator().filterList(letters, letterToExclude));
    log("filter list stream: " + new FilterListStream().filterList(letters, letterToExclude));
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

class FilterListIterator {
  List<String> filterList(List<String> letters, String letterToExclude) {
    String[] lettersArray = (String[]) letters.toArray(String[]::new);
    List<String> lettersCopy = new ArrayList<String>(Arrays.asList(lettersArray));
    Iterator<String> iterator = lettersCopy.iterator();
    while (iterator.hasNext()) {
      String letter = iterator.next();
      if (letter.equals(letterToExclude)) {
        iterator.remove();
      }
    }
    return lettersCopy;
  }
}

class FilterListStream {
  List<String> filterList(List<String> letters, String letterToExclude) {
    return letters
      .stream()
      .filter(letter -> !letter.equals(letterToExclude))
      .collect(Collectors.toList());
  }
}
