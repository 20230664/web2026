package kr.ac.kumoh.s20260664.w26w10_controller.controller

import kr.ac.kumoh.s20260664.w26w10_controller.service.SongService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SongController(
    private val service: SongService
) {
//    val title = listOf("Cosmic Echo", "Neon Fever", "Velvet Bitter", "소란스러운 비밀")

    @GetMapping("/songs")
    fun getSongs() = service.findAllSongs()
}