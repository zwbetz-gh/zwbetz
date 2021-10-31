import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ForkJoinPool;

public class App {

  public static void main(String[] args) {
    timeRunnable("sumSequential", App::sumSequential);
    log("");

    timeRunnable("sumParallel", App::sumParallel);
    log("");

    logAvailableProcessors();
    logCommonPool();
    log("");
  }

  static void sumSequential() {
    int sum = createNumbers()
      .stream()
      .mapToInt(App::costlyMapper)
      .sum();
    log("sum: %s", sum);
  }

  static void sumParallel() {
    int sum = createNumbers()
      .stream()
      .parallel()
      .mapToInt(App::costlyMapper)
      .sum();
      log("sum: %s", sum);
    }

  static List<Integer> createNumbers() {
    return Arrays.asList(1, 2, 3);
  }

  static Integer costlyMapper(Integer i) {
    log("costlyMapper, val: %s, thread: %s", i, Thread.currentThread().getName());
    sleep(1000);
    return i * 1;
  }

  static void logAvailableProcessors() {
    log("processors: %s", Runtime.getRuntime().availableProcessors());
  }

  static void logCommonPool() {
    log("pool: %s", ForkJoinPool.commonPool());
  }

  static void log(String format, Object... args) {
    System.out.println(String.format(format, args));
  }

  static void sleep(long millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  static void timeRunnable(String name, Runnable runnable) {
    log("Started %s", name);
    long startTime = System.nanoTime();
    runnable.run();
    long endTime = System.nanoTime();
    long duration = endTime - startTime;
    String formattedDuration = new DecimalFormat("0.00").format((double) duration / 1_000_000_000);
    log("Completed %s in %s second(s)", name, formattedDuration);
  }

}
