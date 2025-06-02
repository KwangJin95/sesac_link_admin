package kr.sesaclink.global.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {

  private List<E> dtoList;

  private List<Integer> pageNumList;

  // 이전, 다음 페이지의 존재 여부
  private boolean prev, next;

  private int total, prevPage, nextPage, totalPage, current;

  @Builder(builderMethodName = "withAll")
  public PageResponseDTO(Integer page, Integer size, List<E> dtoList, int total) {

    this.dtoList = dtoList;
    this.total = total;

    // 페이지 번호 계산
    int end = (int)(Math.ceil(page / (double) size)) * size; // 화면에서의 마지막 번호
    int start = end - (size - 1);

    // 마지막 페이지 계산 및 끝 페이지 보정
    int last = (int)(Math.ceil((total / (double) size)));  // 마지막 페이지 번호

    end = end > last ? last : end;

    // 이전/다음 페이지 존재 여부 계산
    this.prev = start > 1;
    this.next = total > end * size;

    this.pageNumList = IntStream.rangeClosed(start, end).boxed()
            .collect(Collectors.toList());

    if (prev) {
      this.prevPage = start - 1;
    }

    if (next) {
      this.nextPage = end + 1;
    }

    this.totalPage = this.pageNumList.size();

    this.current = page;
  }

}
