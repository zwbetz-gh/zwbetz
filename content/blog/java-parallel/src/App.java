import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.List;

public class App {

  public static void main(String[] args) {
    timeRunnable("runAllActionsSequential", App::runAllActionsSequential);
    timeRunnable("runAllActionsParallel", App::runAllActionsParallel);
  }

  static void runAllActionsSequential() {
    getAllActions()
      .stream()
      .sequential()
      .forEach(Runnable::run);
  }

  static void runAllActionsParallel() {
    getAllActions()
      .stream()
      .parallel()
      .forEach(Runnable::run);
  }

  static List<Runnable> getAllActions() {
    return Arrays.asList(
      App::costlyAction1,
      App::costlyAction2,
      App::costlyAction3
    );
  }

  static void costlyAction1() {
    log(String.format("costlyAction1 %s", Thread.currentThread()));
    sleep(1000);
  }

  static void costlyAction2() {
    log(String.format("costlyAction2 %s", Thread.currentThread()));
    sleep(1000);
  }

  static void costlyAction3() {
    log(String.format("costlyAction3 %s", Thread.currentThread()));
    sleep(1000);
  }

  static void log(Object message) {
    System.out.println(message);
  }

  static void sleep(long millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  static String formatDecimal(final long number) {
    return new DecimalFormat("0.00").format((double) number / 1_000_000_000);
  }

  static void timeRunnable(String name, Runnable runnable) {
    log(String.format("Started %s", name));
    final long startTime = System.nanoTime();
    runnable.run();
    final long endTime = System.nanoTime();
    final long duration = endTime - startTime;
    log(String.format("Completed %s in %s second(s)", name, formatDecimal(duration)));
  }

}
